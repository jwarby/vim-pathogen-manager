const fs = require('fs-extra-promise')

const { INSTALL_DIR } = require('../config')

/**
 * List names of installed plugins
 *
 * @return {Promise}
 */
module.exports = () => (
  fs.readdirAsync(INSTALL_DIR)
)
