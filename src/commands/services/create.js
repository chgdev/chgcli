const {Command, flags} = require('@oclif/command')

class ServicesCreateCommand extends Command {
  async run() {
    // const {flags} = this.parse(ServicesCreateCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-175')
  }
}

ServicesCreateCommand.description = `Creates a new service
...
Extra documentation about creating a new service
`

ServicesCreateCommand.flags = {
  name: flags.string({char: 'n', description: 'Service Name', required: true}),
}

module.exports = ServicesCreateCommand
