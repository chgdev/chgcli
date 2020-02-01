const {Command, flags} = require('@oclif/command')

class ServicesListCommand extends Command {
  async run() {
    // const {flags} = this.parse(ServicesListCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-176')
  }
}

ServicesListCommand.description = `Lists available services
...
Extra documentation about listing services
`

ServicesListCommand.flags = {
  name: flags.string({char: 'n', description: 'Service Name', required: true}),
}

module.exports = ServicesListCommand
