const path = require('path')

const chalk = require('chalk')
const fs = require('fs-extra-promise')
const git = require('simple-git')()

const { GITHUB_BASE_URL, INSTALL_DIR } = require('../config')

module.exports = name => {
  const pluginName = path.basename(name)

  return new Promise((resolve, reject) => {
    console.log(chalk.cyan(`Installing '${pluginName}'...`))

    const dirPath = path.resolve(name)

    // If it's a path on local filesystem, symlink
    let isLocal

    try {
      isLocal = fs.isDirectorySync(dirPath)
    } catch (e) {
      isLocal = false
    }

    if (isLocal) {
      console.log(chalk.cyan('Symlinking from local disk...'))
      return resolve(fs.ensureSymlinkAsync(dirPath, `${INSTALL_DIR}/${pluginName}`))
    }

    // Otherwise try to install from GitHub
    git.clone(`${GITHUB_BASE_URL}/${name}`, `${INSTALL_DIR}/${pluginName}`, (err, ...rest) => (
      err && reject(err) || resolve(...rest)
    ))
  })
}
