import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const path = resolve(dirName, 'files', 'fresh.txt');

const create = async () => {
  try {
    await writeFile(path, 'I am fresh and young', { flag: 'wx' });
  } catch {
    throw new Error('FS operation failed');
  }
};

await create();