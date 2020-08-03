module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['adm-zip' ],
      builderOptions: {
        afterSign: "notarize.js",
        mac: {
          hardenedRuntime : true,
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
