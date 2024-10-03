import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const path = resolve(dirName, 'files', 'wrongFilename.txt');
const renamePath = resolve(dirName, 'files', 'properFilename.md');

const rename = async () => {
    try {
        await fs.rename(path, renamePath);
    } catch {
        throw new Error('FS operation failed');
    }
};

await rename();
