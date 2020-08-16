module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['adm-zip', 'axios', 'arraybuffer-to-buffer', 'vue-router', 'ws', 'sudo-prompt'],
      builderOptions: {
        afterSign: "notarize.js",
        mac: {
          hardenedRuntime : true,
          gatekeeperAssess: false,
          entitlements: "build/entitlements.mac.inherit.plist",
          entitlementsInherit: "build/entitlements.mac.inherit.plist",
          type: "distribution"
        },
        dmg: {
          sign: false
        }
      }
    }
  }
}
