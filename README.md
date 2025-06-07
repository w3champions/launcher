# PLEASE NOTE: This launcher is deprecated and no longer in active development!

# w3c-launcher
There is a private submodule that is needed for color switch and skins, you need to be in the w3c org to see that. All other stuff can be built normally.

After you clone this repo, to also clone the submodule run.

```
git submodule init
git submodule update

```

## Project setup
Install Visual Studio 2017 and the C++ Desktop Tools, as we need them for our native module. Also this command helps
```
npm install --global --production windows-build-tools
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

### to run a signing process
- run the build as normal with an updated version
- ask modmoto to do a manual sign
  - run local build
  - run local `signWindows.bat` with usb installed
  - upload exe, blockmap and latest.yml to GH after build 
- release 
