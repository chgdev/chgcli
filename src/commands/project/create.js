const {Command, flags} = require('@oclif/command')

class ProjectCreateCommand extends Command {
  async run() {
    const {flags} = this.parse(ProjectCreateCommand)
    const name = flags.name
    const language = flags.language
    this.log(`Creating ${name} as a new ${language} project...`)

    const isDocker = flags.docker
    if (isDocker) this.log('This is a Docker project. Will include Dockerfile.')

    const isK8s = flags.k8s
    if (isK8s) this.log('This is a Kubernetes project. Will include Kubernetes scaffolding.')

    const isJenkins = flags.jenkins
    if (isJenkins) this.log('This is a Jenkins project. Will create Jenkinsfile.')
  }
}

ProjectCreateCommand.description = `Creates a new software project
...
Extra documentation about creating a new software project
`

ProjectCreateCommand.flags = {
  name: flags.string({char: 'n', description: 'Project Name', required: true}),
  language: flags.string({char: 'l', description: 'Core language for the project', options: ['node', 'java-spring-boot'], env: 'CHG_DEFAULT_LANGUAGE', required: true}),
  docker: flags.boolean({char: 'd', description: 'Builds to Docker container?', default: false}),
  k8s: flags.boolean({char: 'k', description: 'Add Kubernetes scaffolding?', default: false}),
  jenkins: flags.boolean({char: 'j', description: 'Use Jenkins pipeline?', default: false}),
}

module.exports = ProjectCreateCommand
