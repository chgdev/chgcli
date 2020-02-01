const {Command, flags} = require('@oclif/command')

class ServicesDeleteCommand extends Command {
  async run() {
    // const {flags} = this.parse(ServicesDeleteCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-177')
  }
}

ServicesDeleteCommand.description = `Deletes a service
...
Extra documentation about deleting a service
`

ServicesDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'Service Name', required: true}),
}

module.exports = ServicesDeleteCommand
