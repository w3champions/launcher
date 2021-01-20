# w3c-launcher
There is a private submodule that is needed for color switch and skins, you need to be in the w3c org to see that. All other stuff can be built normally.

## Project setup
Install Visual Studio 2017 and the C++ Desktop Tools, as we need them for our native module. Also this command helps
```
npm install --global --production windows-build-tools
npm install ./src/hot-keys/ItemHotkeys/send-keys-native
npm install
```

### start launcher
```
npm run serve
```

### build launcher
will not sign the app, though, just build it.

```
npm run build
```
