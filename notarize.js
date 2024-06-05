const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;
    if (electronPlatformName !== 'darwin' || !process.env.APP_PW) {
        return;
    }

    const appName = context.packager.appInfo.productFilename;

    return await notarize({
        appPath: `${appOutDir}/${appName}.app`,
        appleId: "xuke.ca@hotmail.com",
        appleIdPassword: process.env.APP_PW,
        teamId: process.env.APPLE_TEAM_ID,
    });
};
