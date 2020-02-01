const {Command, flags} = require('@oclif/command')

class ContractsListCommand extends Command {
  async run() {
    // const {flags} = this.parse(ContractsListCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-165')
  }
}

ContractsListCommand.description = `Lists available API/event contracts
...
Extra documentation about listing contracts
`

ContractsListCommand.flags = {
  name: flags.string({char: 'n', description: 'Contract Name', required: true}),
}

module.exports = ContractsListCommand
