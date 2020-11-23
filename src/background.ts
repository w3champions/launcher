'use strict'

import {app, protocol, globalShortcut, screen, BrowserWindow, dialog, ipcMain, IpcMainEvent} from 'electron'
import {autoUpdater, UpdateInfo} from 'electron-updater'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
declare const __static: string;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null
let fab: BrowserWindow | null

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
  globalShortcut.unregisterAll()
})

function createWindow() {
  // Create the browser window.

  win = new BrowserWindow({
    width: 1275,
    height: 830,
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
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }

  if (fab === null) {
    await createFab()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      logger.error('Vue Devtools failed to install:', e.toString())
    }
  }

  try {
    await autoUpdater.checkForUpdatesAndNotify();
  } catch (e) {
    logger.error("Updating failed horribly, starting without check for new version");
    logger.error(e);
  }

  createWindow()
  await createFab()
})

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
    y: height - 45,
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

  fab.setAlwaysOnTop(true, "status", 50);
  await fab.loadURL(`${__static}/fab.html`);
}

ipcMain.on('manual-hotkey', (ev: IpcMainEvent, arg) => {
  if (fab) {
    fab.webContents.send('manual-hotkey-forward', arg);
  }
})
