import { createReadStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const readStream = createReadStream(path, 'utf-8');
        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        readStream.on('end', () => {
            process.stdout.write('\n');
        });
    } catch {
        throw new Error('Error reading');
    }
};

await read();
