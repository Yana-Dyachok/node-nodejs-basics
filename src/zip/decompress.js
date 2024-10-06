import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = resolve(dirName, 'files', 'fileToCompress.txt');
const archivePath = resolve(dirName, 'files', 'archive.gz');

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
