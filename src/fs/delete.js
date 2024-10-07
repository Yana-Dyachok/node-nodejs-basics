import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
    try {
        await rm(path);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
