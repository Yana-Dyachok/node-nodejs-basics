import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = resolve(dirName, 'files', 'fileToCompress.txt');
const archivePath = resolve(dirName, 'files', 'archive.gz');

const compress = async () => {
    try {
        const file = createReadStream(filePath);
        const archiveFile = createWriteStream(archivePath);
        const compressFile = createGzip();

        await pipeline(file, compressFile, archiveFile);
    } catch {
        throw new Error('Error compresing');
    }
};

await compress();
