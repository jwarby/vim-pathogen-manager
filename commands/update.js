const path = require('path')

const chalk = require('chalk')
const fs = require('fs-extra-promise')
const gitInit = require('simple-git')

const { INSTALL_DIR } = require('../config')
const listPlugins = require('../lib/listPlugins')

/**
 * Checks if the plugin at `path` can be updated.
 *
 * @todo need to check if .git folder exists (ie that directory IS a git
 *       repository)
 *
 * @param {String} path  Path to the plugin
 *
 * @return {Promise}
 */
const canBeUpdated = path => (
  fs.lstatAsync(path).then(stats => (
    !stats.isSymbolicLink() && stats.isDirectory()
  ))
)

/**
 * Updates a single plugin by calling `git pull` inside the plugin directory.
 *
 * @param {String} repoPath  Path to the repository
 *
 * @return {Promise}
 */
const update = repoPath => {
  const pluginName = path.basename(repoPath)

  return new Promise((resolve, reject) => {
    console.log(chalk.cyan(`Updating '${pluginName}'...`))
    gitInit(repoPath).pull((err, results) => {
      if (err) {
        console.error(chalk.red(`Failed to update '${pluginName}'!`))
        console.error(chalk.red(err))
        return reject(err)
      }

      // Check if anything actually changed
      const didUpdate = Object.keys(results.summary).some(key => results.summary[key])

      if (didUpdate) {
        console.log(chalk.green(`'${pluginName}' successfully updated!`))
      } else {
        console.log(chalk.yellow(`'${pluginName}' already up-to-date`))
      }

      return resolve(results)
    })
  })
}

module.exports = name => {
  if (!name) {
    console.log(chalk.cyan('Updating all plugins...'))

    return listPlugins.map(file => (
      path.resolve(path.join(INSTALL_DIR, file))
    )).filter(canBeUpdated).map(update)
  }

  const repoPath = path.join(INSTALL_DIR, name)
  return canBeUpdated(repoPath).then(canBeUpdated => {
    if (!canBeUpdated) {
      console.error(chalk.red(`Cannot update plugin '${name}'`))
      throw new Error('Cannot update this plugin')
    }

    return update(repoPath)
  }).catch(err => {
    if (err.code === 'ENOENT') {
      console.error(chalk.red(`Plugin '${name}' is not installed!`))
    }

    throw err
  })
}
