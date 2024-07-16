const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  publicPath: "/",
  pluginOptions: {
    electronBuilder: {
      externals: [
        'adm-zip',
        'bindings',
        'send-keys-native',
        'arraybuffer-to-buffer',
        'vue-router',
        'ws',
        'sudo-prompt',
        'fs-extra',
        'electron-log',
        'electron-updater',
      ],
      builderOptions: {
        extraFiles: [
          {
            from: 'libs/flo-worker.exe',
            to: './resources/app.asar.unpacked/flo-worker.exe',
          },
          {
            from: 'libs/flo-worker',
            to: './resources/app.asar.unpacked/flo-worker',
          }
        ],
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
        win: {
          publisherName: ["Deespul LLC"],
          target: ["nsis"]
        },
        publish: [{
          provider: "github",
          owner: "w3champions",
          repo: "w3champions-launcher"
        }]
      }
    }
  },
  configureWebpack: (config) => {
    config.module.rules = [...config.module.rules, {
      test: /\.(png|jpg|gif|svg|xcf|otf)$/i,
      loader: 'url-loader',
      options: {
        esModule: false,
      },
      type: 'javascript/auto'
    }]
    if (process.env.NODE_ENV === "development") {
      config.devtool = "eval-source-map";
      config.output.devtoolModuleFilenameTemplate = (info) =>
          info.resourcePath.match(/\.vue$/) &&
          !info.identifier.match(/type=script/) // this is change ✨
              ? `webpack-generated:///${info.resourcePath}?${info.hash}`
              : `webpack-yourCode:///${info.resourcePath}`;

      config.output.devtoolFallbackModuleFilenameTemplate =
          "webpack:///[resource-path]?[hash]";
    }
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),  
      }),
    ],
    config.resolve.fallback = {
      "fs": require.resolve("fs-extra"),
      "net": require.resolve("net"),
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "crypto-browserify": require.resolve("crypto-browserify"),
      "util": require.resolve("util/"),
      "vm": require.resolve("vm-browserify"),
    }
  },
});
