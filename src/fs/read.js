import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'fileToRead.txt');

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
