import { URL } from 'url';
import path from 'path';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string, part: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    console.log(url.href + "#/" + part);
    return url.href + "#/" + part;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName + "#/" + part)}`;
}

export function getAssetPath() {

}

export function readUserConfig() {
  const configFile = path.join(__dirname, "../../appconfig.json");
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  return config;
}

export async function readSystemConfig() {}
