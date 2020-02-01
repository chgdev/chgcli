const {Command, flags} = require('@oclif/command')

class ContractsCreateCommand extends Command {
  async run() {
    // const {flags} = this.parse(ContractsCreateCommand)
    // const name = flags.name
    this.log('Not Implemented: See Jira EA-164')
  }
}

ContractsCreateCommand.description = `Creates a new API/event contract
...
Extra documentation about creating a new contract
`

ContractsCreateCommand.flags = {
  name: flags.string({char: 'n', description: 'Contract Name', required: true}),
}

module.exports = ContractsCreateCommand
