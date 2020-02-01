const {Command, flags} = require('@oclif/command')

class ToolsCreateCommand extends Command {
  async run() {
    // const {flags} = this.parse(ToolsCreateCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-168')
  }
}

ToolsCreateCommand.description = `Creates a new tool
...
Extra documentation about creating a new tool
`

ToolsCreateCommand.flags = {
  name: flags.string({char: 'n', description: 'Tool Name', required: true}),
}

module.exports = ToolsCreateCommand
