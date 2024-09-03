/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { Command } from 'commander';
import { handleIPCEvents } from './IPCEvents';
import WelcomeWindow from 'src/windows/WelcomeWindow';
import { Database } from 'sqlite3';
import { readSystemConfig, readUserConfig } from 'src/util/config';
import SetupWindow from '@windows/SetupWindow';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const ENV = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
};

const userConfig   = readUserConfig();
const systemConfig = readSystemConfig();

const WELCOME_WINDOW_TITLE = "";
const SETUP_WINDOW_TITLE = "";

const program = new Command();
program.name('next').description('NEXT CLI util').version("1.0.0");
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse();

if (process.env.NODE_ENV === ENV.PRODUCTION) {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const IS_DEBUG = process.env.NODE_ENV === ENV.DEVELOPMENT || process.env.DEBUG_PROD === 'true';
IS_DEBUG && require('electron-debug')();

handleIPCEvents('IPCMain events', (i: typeof ipcMain) => {

});

let mainWindow = null;

switch (userConfig.stage) {
  case 'done':
    mainWindow = new WelcomeWindow(WELCOME_WINDOW_TITLE);
  break;
  default:
    mainWindow = new SetupWindow(SETUP_WINDOW_TITLE);
}

mainWindow.run();
