const chalk = require('chalk')
const fs = require('fs-extra-promise')

const { INSTALL_DIR } = require('../config')

module.exports = name => {
  console.log(chalk.cyan(`Removing '${name}'...`))

  const installLocation = `${INSTALL_DIR}/${name}`

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(installLocation)) {
      return reject(new Error(`Plugin '${name}' is not installed`))
    }

    return fs.lstatAsync(installLocation).then(stats => {
      if (stats.isSymbolicLink()) {
        console.log(chalk.cyan('Removing symbolic link...'))
      }

      return resolve(fs.removeAsync(installLocation))
    })
  })
}
