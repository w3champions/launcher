module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['adm-zip', 'axios', 'robotjs', 'arraybuffer-to-buffer'],
      builderOptions: {
        afterSign: "notarize.js",
        mac: {
          hardenedRuntime : false,
          gatekeeperAssess: false,
          entitlements: "build/entitlements.mac.inherit.plist"
        },
        dmg: {
          sign: false
        }
      }
    }
  }
}
