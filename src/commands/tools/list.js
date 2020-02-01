const {Command, flags} = require('@oclif/command')

class ToolsListCommand extends Command {
  async run() {
    // const {flags} = this.parse(ToolsListCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-167')
  }
}

ToolsListCommand.description = `Lists available tools
...
Extra documentation about listing tools
`

ToolsListCommand.flags = {
  name: flags.string({char: 'n', description: 'Tool Name', required: true}),
}

module.exports = ToolsListCommand
