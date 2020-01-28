const {Command, flags} = require('@oclif/command')

class PipelinesListCommand extends Command {
  async run() {
    // const {flags} = this.parse(PipelinesListCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-174')
  }
}

PipelinesListCommand.description = `Lists available pipelines
...
Extra documentation about listing pipelines
`

PipelinesListCommand.flags = {
  name: flags.string({char: 'n', description: 'Pipeline Name', required: true}),
}

module.exports = PipelinesListCommand
