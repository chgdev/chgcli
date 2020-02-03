// This package generates projects from templates. See package-builder.md for documentation.
const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');

const NUNJUCKS_DEFAULT_CONFIG = { autoescape: false };

// Generates a new project at the given target path, based on the template located at the indicated
// template path.
module.exports = (templatePath, targetPath, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(templatePath)) {
      reject(Error(`Directory does not exist: ${templatePath}`));
    }

    if (!fs.statSync(templatePath).isDirectory()) {
      reject(Error(`Not a directory: ${templatePath}`));
    }

    if (fs.existsSync(targetPath)) {
      reject(Error(`Already exists: ${targetPath}`));
    }

    const metadata = loadMetadata(templatePath);
    const finalOptions = metadata.defaults;
    copyToObject(finalOptions, options);

    if (!finalOptions.addons) {
      finalOptions.addons = {};
    }

    const unknownAddons = Object.keys(finalOptions.addons)
      .filter(key => !metadata.addons[key]);

    if (unknownAddons.length) {
      reject(Error(`Unknown add-on(s): ${unknownAddons.join(', ')}`));
    }

    templatePath = path.resolve(templatePath);
    targetPath = path.resolve(targetPath);
    const excluded = computePathsToExclude(templatePath, metadata, finalOptions);

    if (!finalOptions._name) {
      finalOptions._name = path.basename(targetPath);
    }

    finalOptions._timestamp = new Date();
    const ctx = {
      templatePath,
      targetPath,
      metadata,
      options: finalOptions,
      isExcluded: p => excluded.has(p)
    };
    walk(templatePath, targetPath, ctx);
    resolve();
  });
};

// Returns a Set containing the paths from the template that are to be excluded.
const computePathsToExclude = (templatePath, metadata, options) => {
  const active = new Set();
  const inactive = new Set();
  Object.entries(metadata.addons).forEach(entry => {
    const addon = entry[1];

    if (!addon.include.length) {
      return;
    }

    const key = entry[0];
    const set = options.addons[key] ? active : inactive;
    addon.include.forEach(p => set.add(path.resolve(templatePath, p)));
  });
  active.forEach(inactive.delete);
  return inactive;
};

// Returns a metadata object for the given template path. If a .metadata.json file is found in that
// directory, its contents are loaded and normalized. Otherwise, a default metadata object is
// returned.
const loadMetadata = templatePath => {
  const metadataPath = path.join(templatePath, '.metadata.json');
  let metadata = {};

  if (fs.existsSync(metadataPath)) {
    if (!fs.statSync(metadataPath).isFile()) {
      reject(Error(`Not a file: ${metadataPath}`));
    }

    metadata = JSON.parse(fs.readFileSync(metadataPath));
  }

  if (!metadata.templateExtension) {
    metadata.templateExtension = '.njk';
  } else {
    metadata.templateExtension = '.' + metadata.templateExtension;
  }

  if (!metadata.addons) {
    metadata.addons = {};
  } else {
    Object.values(metadata.addons).forEach(addon => {
      if (!addon.include) {
        addon.include = [];
      } else {
        addon.include.map(p => path.resolve(p));
      }
    });
  }

  if (!metadata.defaults) {
    metadata.defaults = {};
  }

  const nunjucksConfig = {};
  copyToObject(nunjucksConfig, NUNJUCKS_DEFAULT_CONFIG);

  if (metadata.nunjucksConfig) {
    copyToObject(nunjucksConfig, metadata.nunjucksConfig);
  }

  metadata.nunjucksConfig = nunjucksConfig;
  return metadata;
};

// Walks the directory tree at the given template path and generates the corresponding files in the
// target path. This function recurses for subdirectories.
const walk = (fromPath, toPath, ctx) => {
  fs.mkdirSync(toPath);
  const files = fs.readdirSync(fromPath);
  let njkEnv = null;

  files.forEach(file => {
    const fromFile = path.join(fromPath, file);
    let toFile = path.join(toPath, file);

    if (fromPath === ctx.templatePath && file === '.metadata.json') {
      return;
    }

    if (ctx.isExcluded(fromFile)) {
      return;
    }

    if (fs.statSync(fromFile).isDirectory()) {
      walk(fromFile, toFile, ctx);
    } else if (fromFile.endsWith(ctx.metadata.templateExtension)) {
      toFile = toFile.substring(0, toFile.length - ctx.metadata.templateExtension.length);

      if (!njkEnv) {
        njkEnv = nunjucks.configure(fromPath, ctx.metadata.nunjucksConfig);
      }

      fs.writeFileSync(toFile, njkEnv.render(file, ctx.options));
    } else {
      fs.copyFileSync(fromFile, toFile);
    }
  });
};

// Modifies the target object to import properties from the source object. If a property exists on
// both objects and the value of each property is itself an object (which is not null or an array),
// copyToObject() recurses on the property values. Otherwise, the target value is overwritten by the
// source value. This function validates the arguments, then delegates to copyToObjectInternal() to
// perform the actual copying.
const copyToObject = (target, source) => {
  if (!isRegularObject(target)) {
    throw Error('Target is not an object');
  }

  if (!isRegularObject(source)) {
    throw Error('Source is not an object');
  }

  copyToObjectInternal(target, source);
};

// Internal implementation for copyToObject(), which assumes that the arguments are both non-null,
// non-array objects.
const copyToObjectInternal = (target, source) => {
  Object.entries(source).forEach(([ key, sourceValue ]) => {
    const targetValue = target[key];

    if (isRegularObject(sourceValue) && isRegularObject(targetValue)) {
      copyToObjectInternal(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
};

// Returns true if the given value is a non-null, non-array object.
const isRegularObject = val => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
};
