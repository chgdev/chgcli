const {Command, flags} = require('@oclif/command')

class WorkersCreateCommand extends Command {
  async run() {
    // const {flags} = this.parse(WorkersCreateCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-178')
  }
}

WorkersCreateCommand.description = `Creates a new worker
...
Extra documentation about creating a new worker
`

WorkersCreateCommand.flags = {
  name: flags.string({char: 'n', description: 'Worker Name', required: true}),
}

module.exports = WorkersCreateCommand
