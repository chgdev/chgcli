const {Command, flags} = require('@oclif/command')
const k8s = require('@kubernetes/client-node');
class ServicesListCommand extends Command {
  async run() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    try {
      let {body} = await k8sApi.listNamespacedPod('feature') 
      console.log(body)   
    } catch (error) {
      this.error('You are not authorized throught the Aws CLI')
    }
  }
}

ServicesListCommand.description = `Lists available services
...
Extra documentation about listing services
`

ServicesListCommand.flags = {
  name: flags.string({char: 'n', description: 'Service Name', required: true}),
}

module.exports = ServicesListCommand
