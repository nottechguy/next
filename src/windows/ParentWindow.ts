import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { resolveHtmlPath } from '../util/config';

class ParentWindow {

  rootWindow: BrowserWindow;

  constructor(title: string, options: BrowserWindowConstructorOptions) {
    this.rootWindow = new BrowserWindow(options);
    this.rootWindow.setTitle(title);
  }

  setRootFile(filename: string, windowHash: string) {
    this.rootWindow.loadURL(resolveHtmlPath(filename, windowHash));
  }

  addMenu() {}

  run() {}
}

export default ParentWindow;
