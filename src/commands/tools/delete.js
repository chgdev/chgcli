const {Command, flags} = require('@oclif/command')

class ToolsDeleteCommand extends Command {
  async run() {
    // const {flags} = this.parse(ToolsDeleteCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-169')
  }
}

ToolsDeleteCommand.description = `Deletes a tool
...
Extra documentation about deleting a tool
`

ToolsDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'Tool Name', required: true}),
}

module.exports = ToolsDeleteCommand
