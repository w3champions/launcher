'use strict'

import {app, protocol, globalShortcut, screen, BrowserWindow, dialog, ipcMain, IpcMainEvent, Tray, Menu, nativeImage, shell } from 'electron'
import {autoUpdater, UpdateInfo} from 'electron-updater'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path';
import { machineIdSync } from 'node-machine-id';
import { floNetworkTestService } from './background-thread/flo/flo-network-test.service'
import { LoginGW } from './globalState/rootTypings'
import { endpointService, IEndpoint } from './background-thread/endpoint/endpoint.service'
import { floUtilsService } from './background-thread/flo/flo-utils.service'
import fetch from 'electron-fetch'
const Store = require('electron-store');
import _ from 'lodash';
import si from 'systeminformation';

const isDevelopment = process.env.NODE_ENV !== 'production'
declare const __static: string;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null
let fab: BrowserWindow | null
let tray: Tray | null;

const logger = require("electron-log")

logger.transports.file.level = "debug"
logger.transports.console.level = "debug"

autoUpdater.logger = logger

autoUpdater.on("update-downloaded", async (info: UpdateInfo) => {
  logger.info(`Update downloaded: ${info.version}`)

  if (win instanceof BrowserWindow) {
    const buttonIndex = await dialog.showMessageBox(win, {
      type: "info",
      title: `New version ${info.version}`,
      message: `A new version (${info.version}) of the launcher is out, please update`,
      buttons: ['Update and restart']
    })

    if (buttonIndex.response === 0) {
      const isSilent = true;
      const isForceRunAfter = true;
      logger.info("restarting app from menu")
      autoUpdater.quitAndInstall(isSilent, isForceRunAfter);
    }
  }
})

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

app.allowRendererProcessReuse = false;

app.on('will-quit', () => {
  try {
    globalShortcut.unregisterAll()
    // eslint-disable-next-line no-empty
  } catch(e) {
  }
});

function createWindow() {
  const bounds = getWindowBounds();

  // Create the browser window.
  win = new BrowserWindow({
    width: 1275,
    height: 830,
    x: bounds.x,
    y: bounds.y,
    resizable: true,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false
    }
  });

  // set size after the window is made because electron initially
  // uses wrong screen bounds when the window is non on primary monitor
  win.setSize(_.isUndefined(bounds.width) ? 1275 : bounds.width,
              _.isUndefined(bounds.height) ? 830 : bounds.height, false)

  floNetworkTestService.setWindow(win);
  floUtilsService.registerHandlers();
  endpointService.setWindow(win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null;
    fab = null;
  });

  win.on('moved', function () {
    setWindowBounds();
  })

  win.on('resized', function () {
    setWindowBounds();
  })
}

function createTray() {
  const iconPath = path.join(__dirname, isDevelopment ? '../build/icon.png' : 'favicon.ico');
  tray = new Tray(nativeImage.createFromPath(iconPath));

  tray.on('click', ()=> {
    win?.show();
  });

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        win?.show();
      }
    },
    {
      label: 'Quit', click: function () {
        app.quit();
      }
    }
  ]));
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      win.show();
      win.focus()
    }
  })

  ipcMain.handle('w3c-check-for-update', async (_: unknown, endpoint: IEndpoint) => {
    let error = null
    try {
      if (endpoint.staticBaseUpdateFileUrl) {
        // Special logic created for China, where access to github is unstable
        const url = `${endpoint.updateUrl}api/launcher-version`
        const { version } = await fetch(url).then(res => res.json())
        const localVersion = app.getVersion()
        if (version !== localVersion) {
          const localParts = localVersion.split('.')
          const remoteParts = version.split('.')
          for (let i = 0; i < 3; i++) {
            const local = parseInt(localParts[i])
            const remote = parseInt(remoteParts[i])
            if (local > remote) {
              return;
            } else if (local < remote) {
              break;
            }
          }

          if (win instanceof BrowserWindow) {
            await dialog.showMessageBox(win, {
              type: "info",
              title: `New version ${version}`,
              message: `A new version (${version}) of the launcher is out, please download and install`,
              buttons: ['Download']
            })
            const filename = process.platform === 'win32' ? `w3champions Setup ${version}.exe` : `w3champions-${version}.dmg`
            const url = `${endpoint.staticBaseReleaseUrl}${encodeURIComponent(filename)}`
            shell.openExternal(url)
            app.exit()
          }
        }
      } else {
        await autoUpdater.checkForUpdatesAndNotify();
      }
    } catch (e) {
      logger.error("Updating failed horribly, starting without check for new version");
      logger.error(e);
      error = e
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    const isTest = Boolean(process.env.IS_TEST)
    if (isDevelopment && !isTest) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS_DEVTOOLS)
      } catch (e) {
        logger.error('Vue Devtools failed to install:', e.toString())
      }
    }

    createWindow();
    createTray();
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

async function createFab() {
  const display = screen.getPrimaryDisplay();
  const height = display.bounds.height;

  fab = new BrowserWindow({
    width: 50,
    height: 50,
    x: 0,
    y: height - Math.floor(height * 0.08),
    resizable: false,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false
    }
  })

  fab.on("moved", async (e:any) => {
    if (win) {
      const bounds = await e.sender.getBounds();
      logger.info(`b: ${bounds.x}`)
      logger.info(`b: ${bounds.y}`)
      win.webContents.send('fab-dragged-forward', `${bounds.x}_${bounds.y}`);
    }
  });

  fab.setAlwaysOnTop(true, "status", 50);
  await fab.loadURL(`${__static}/fab.html`);
}

ipcMain.on('close-window', () => {
  win?.hide();
});

ipcMain.on('manual-hotkey', (ev: IpcMainEvent, arg) => {
  if (fab) {
    fab.webContents.send('manual-hotkey-forward', arg);
  }
});

ipcMain.on('diagnostic-data', async (ev: IpcMainEvent, arg) => {
  const machineId = machineIdSync();
  const systemInformation = await getSystemInformation();

  win?.webContents.send('diagnostic-data-forward', {machineId, ...systemInformation});
});

ipcMain.on('fab-options-loaded', async (ev: IpcMainEvent, args) => {
  await createFab();
  if (fab) {
    if (args?.x || args?.y) {
      logger.info(`set position of fab to ${args.x}, ${args.y}`)
      fab.setPosition(args.x, args.y);
      fab.show();
    }

    logger.info(`no position saved, fab on default now`)
  }
})

ipcMain.on('fab-disabled', async (ev: IpcMainEvent, args) => {
  if (fab) {
    fab.close();
  }
  fab = null;
});

async function getSystemInformation() {
  const uuid = await si.uuid((data) => {
    return data;
  })

  const system = await si.system((data) => {
    return data
  })

  const baseboard = await si.baseboard((data) => {
    return data
  })

  const diskLayout = await si.diskLayout((data) => {
    return data
  })

  return { uuid, system, baseboard, diskLayout };
}

function getWindowBounds() {
  const store = new Store();
  const x = store.get("bounds.x");
  const y = store.get("bounds.y");
  const width = store.get("bounds.width");
  const height = store.get("bounds.height");
  return { x, y, width, height }
}

function setWindowBounds() {
  if (win) {
    const store = new Store();
    const { x, y, width, height } = win.getBounds();
    store.set("bounds.x", x);
    store.set("bounds.y", y);
    store.set("bounds.width", width);
    store.set("bounds.height", height);
  }
}

const authUrlChina = 'https://www.battlenet.com.cn/oauth/authorize?response_type=code&client_id=d7bd6dd46e2842c8a680866759ad34c2&redirect_uri=http://localhost:8080/login'
const logoutUrlChina = 'https://www.battlenet.com.cn/login/logout';
const authUrlEu = 'https://eu.battle.net/oauth/authorize?response_type=code&client_id=d7bd6dd46e2842c8a680866759ad34c2&redirect_uri=http://localhost:8080/login';
const logoutUrlEu = 'https://eu.battle.net/login/logout';

let authUrl = authUrlEu;
let logoutUrl = logoutUrlEu;

ipcMain.on('oauth-requested', async (ev: IpcMainEvent, args) => {
  if (args === LoginGW.cn) {
    authUrl = authUrlChina;
    logoutUrl = logoutUrlChina;
  } else {
    authUrl = authUrlEu;
    logoutUrl = logoutUrlEu;
  }

  logger.info(`logging into ${authUrl}`)

  let authWindow: BrowserWindow | null = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false
    }
  });

  let logoutWindow: BrowserWindow | null = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false
    }
  });

  try {
    logger.info(`logging out from ${logoutUrl}`)
    await logoutWindow.loadURL(logoutUrl);
    logoutWindow.close();
    logoutWindow = null;
    logger.info(`logged out`)
  } catch (e) {
    logger.error(e)
  }

  await authWindow.loadURL(authUrl);
  authWindow.show();

  let token = '';

  authWindow.webContents.on('will-redirect', async (event, newUrl) => {
    if (authWindow) {
      if (newUrl.startsWith("http://localhost:8080/login")) {
        const strings = newUrl.split("?code=");
        token = strings[1];
        win?.webContents.send('blizzard-code-received', strings[1]);
        authWindow.close();
        authWindow = null
      }
    }
  });

  authWindow.on('closed', function() {
    if (!token) {
      win?.webContents.send('blizzard-window-closed-without-auth');
    }

    authWindow = null;
  });
})
