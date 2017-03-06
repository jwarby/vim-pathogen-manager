const listPlugins = require('../lib/listPlugins')

module.exports = () => (
  listPlugins().then(plugins => {
    console.log(plugins.join('\n'))
  })
)
