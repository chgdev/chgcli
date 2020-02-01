const {Command, flags} = require('@oclif/command')

class PipelinesDeleteCommand extends Command {
  async run() {
    // const {flags} = this.parse(PipelinesDeleteCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-173')
  }
}

PipelinesDeleteCommand.description = `Deletes a pipeline
...
Extra documentation about deleting a pipeline
`

PipelinesDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'Pipeline Name', required: true}),
}

module.exports = PipelinesDeleteCommand
