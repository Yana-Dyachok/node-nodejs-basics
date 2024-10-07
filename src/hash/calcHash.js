import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const hash = createHash('sha256');
    const input = createReadStream(path);

    return new Promise((resolve, reject) => {
        input.on('data', (chunk) => {
            hash.update(chunk);
        });

        input.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`SHA256 hash: ${fileHash}`);
            resolve(fileHash);
        });
        input.on('error', (err) => {
            reject(`Error reading file: ${err.message}`);
        });
    });
};

await calculateHash();
