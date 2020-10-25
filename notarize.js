const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;
    if (electronPlatformName !== 'darwin' || !process.env.APP_PW) {
        return;
    }

    const appName = context.packager.appInfo.productFilename;

    return await notarize({
        appBundleId: 'W3Champions',
        appPath: `${appOutDir}/${appName}.app`,
        appleId: "simonheiss87@gmail.com",
        appleIdPassword: process.env.APP_PW,
    });
};
