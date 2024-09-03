import { existsSync } from 'fs';
import { statSync } from 'fs';
import path from 'path';

export function db_exists(dbname: string, callback?: Function): boolean {
  const DB_PATH = "";
  if (existsSync(DB_PATH) && statSync(DB_PATH).size !== 0) {

  }

  return false;
}
