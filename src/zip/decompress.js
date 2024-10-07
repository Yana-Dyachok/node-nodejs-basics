import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, 'files', 'fileToCompress.txt');
const archivePath = resolve(__dirname, 'files', 'archive.gz');

const decompress = async () => {
    try {
        const archiveFile = createReadStream(archivePath);
        const file = createWriteStream(filePath);
        const decompressFile = createGunzip();

        await pipeline(archiveFile, decompressFile, file);
    } catch {
        throw new Error('Error decompresing');
    }
};

await decompress();
