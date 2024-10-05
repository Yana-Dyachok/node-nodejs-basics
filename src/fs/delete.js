import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
