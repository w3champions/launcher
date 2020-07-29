module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['adm-zip'],
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
}
