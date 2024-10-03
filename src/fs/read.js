import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const path = resolve(dirName, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const fileContent = await readFile(path, {
            encoding: 'utf8',
        });

        console.log(fileContent);
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
