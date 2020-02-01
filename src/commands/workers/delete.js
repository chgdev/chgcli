const {Command, flags} = require('@oclif/command')

class WorkersDeleteCommand extends Command {
  async run() {
    // const {flags} = this.parse(WorkersDeleteCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-180')
  }
}

WorkersDeleteCommand.description = `Deletes a worker
...
Extra documentation about deleting a worker
`

WorkersDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'Worker Name', required: true}),
}

module.exports = WorkersDeleteCommand
