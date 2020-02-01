const {Command, flags} = require('@oclif/command')

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.js`)
  }
}

HelloCommand.description = `Default hello world command (for testing)
Say hello to the world!
Add a -n / --name parameter to say hello to a specific name
`

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}



module.exports = HelloCommand
