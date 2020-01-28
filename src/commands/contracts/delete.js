const {Command, flags} = require('@oclif/command')

class ContractsDeleteCommand extends Command {
  async run() {
    // const {flags} = this.parse(ContractsDeleteCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-166')
  }
}

ContractsDeleteCommand.description = `Deletes an API/event contract
...
Extra documentation about deleting a contract
`

ContractsDeleteCommand.flags = {
  name: flags.string({char: 'n', description: 'Contract Name', required: true}),
}

module.exports = ContractsDeleteCommand
