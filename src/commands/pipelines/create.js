const {Command, flags} = require('@oclif/command')

class PipelinesCreateCommand extends Command {
  async run() {
    // const {flags} = this.parse(PipelinesCreateCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-172')
  }
}

PipelinesCreateCommand.description = `Creates a new pipeline
...
Extra documentation about creating a new pipeline
`

PipelinesCreateCommand.flags = {
  name: flags.string({char: 'n', description: 'Pipeline Name', required: true}),
}

module.exports = PipelinesCreateCommand
