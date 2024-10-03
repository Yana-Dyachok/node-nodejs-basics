import { rm } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const path = resolve(dirName, 'files', 'fileToRemove.txt');

const remove = async () => {
    try {
        await rm(path);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
