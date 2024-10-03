import { readdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filesDir = resolve(dirName, 'files');

const list = async () => {
    try {
        const files = await readdir(filesDir);
        console.log(files);
    } catch (error) {
        if (error.syscall === 'scandir') {
            throw new Error('FS operation failed');
        } else throw error;
    }
};

await list();
