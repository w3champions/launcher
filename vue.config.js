module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['adm-zip', 'axios', 'bindings', 'send-keys-native', 'arraybuffer-to-buffer', 'vue-router', 'ws', 'sudo-prompt'],
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
        },
        publish: [{
          provider: "github",
          owner: "w3champions",
          repo: "w3champions-launcher"
        }],
      }
    }
  }
}
