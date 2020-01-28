const {Command, flags} = require('@oclif/command')

class WorkersListCommand extends Command {
  async run() {
    // const {flags} = this.parse(WorkersListCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-179')
  }
}

WorkersListCommand.description = `Lists available workers
...
Extra documentation about listing workers
`

WorkersListCommand.flags = {
  name: flags.string({char: 'n', description: 'Worker Name', required: true}),
}

module.exports = WorkersListCommand
