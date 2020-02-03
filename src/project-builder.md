# `project-builder`
This module generates new projects from templates. Files or whole directories can be optionally included or excluded by activating or deactivating add-ons. Individual files can be customized by using [Nunjucks](https://mozilla.github.io/nunjucks/) templates.

## Usage
```js
const pb = require('./project-builder');
pb(templateDir, targetDir, options).then(() => {
  // project generated
}).catch(err => {
  // something is borken
});
```

The template directory must exist, and the target directory must not exist.

### Options
The `options` argument declares which add-ons are active and any additional data that should be provided to any Nunjucks templates that get processed.

All add-ons are deactivated by default. To activate an add-on, declare a property with that add-on's name as the key under `options.addons` and set it to any truthy value. Add-ons may have options themselves; these are declared as properties on the add-on's sub-object. You can also declare additional options outside the context of any add-on.

Here is an example `options` object:

```js
const options = {
  addons: {
    addon1: {
      option1: 'foo',
      option2: true
    },
    addon2: {}
  },
  nonAddonOption: 'bar'
};
```

This example activates two add-ons, `addon1` and `addon2`. There are two options set under `addon1`, while `addon2` is activated with no options set. There's also another option set outside of the context of any addon called `nonAddonOption`.

The builder will add the following properties to the `options` object automatically:
- `_name`: The name of the generated project (which is the name of the target directory). You can override this name by specifying it manually in `.metadata.json` (see below) or in the `options` argument.
- `_timestamp`: A `Date` object for when the project was generated.

## Project Templates
A project template is a directory containing project files. Files and directories may be optionally included by add-ons declared in the `.metadata.json` file in the root of the template directory (see below). Files may also be customized prior to copying to the target directory.

### Nunjucks Template Files
By default, any file with an `njk` extension is a Nunjucks template. When such a file is included in the project, it will be processed by Nunjucks, and the resulting content written to the target directory with the Nunjucks extension stripped off. The `options` object provided to the package's exported function is used as the Nunjucks context object. This lets you test to see if an add-on is active or access options values:

```
{% if addons.myAddon %}
Value of foo: {{ addons.myAddon.foo }}
{% endif %}
```

For full details on writing Nunjucks templates, see [their documentation](https://mozilla.github.io/nunjucks/templating.html).

### `.metadata.json`
If a `.metadata.json` file is present in the root of the template directory, it will be read by the project builder. Here is an example:

```json
{
  "templateExtension": "foo",
  "addons": {
    "my-addon-name": {
      "include": [
        "file/that/is/part/of/this.addon"
      ]
    }
  },
  "defaults": {
    "foo": "bar"
  },
  "nunjucksConfig": {
    "tags": {
      "variableStart": "<$",
      "variableEnd": "$>"
    }
  }
}
```

- `templateExtension`: A string that gives the extension for files that should be processed as Nunjucks templates. If this property is omitted, `'njk'` is assumed. This may be useful for avoiding collisions if the generated project uses Nunjucks itself and has template files with the `njk` extension.
- `addons`: An object which declares the add-ons which are available for the project. Its value is an object where each property represents an add-on. If you attempt to activate an add-on that is not declared here, an error will be thrown.
- `include`: If this property of an add-on is declared, the listed files or directories in the template will be skipped when the add-on is disabled. If multiple add-ons claim the same path, it will be skipped only if all add-ons that include it are disabled. Files which are not claimed by any add-ons are always included.
- `defaults`: Contains the default options. This will be the starting point over which the options specified in the `options` object passed into the package's exported function are applied.
- `nunjucksConfig`: Allows you to send configuration options into the Nunjucks templating engine. See the [Nunjucks configuration documentation](https://mozilla.github.io/nunjucks/api.html#configure) for details. For example, this allows you to change what the start and end tags are so that they don't conflict with existing tags that may be in use in your files. By default, the Nunjucks configuration will be:

```json
{
  "autoescape": false
}
```
