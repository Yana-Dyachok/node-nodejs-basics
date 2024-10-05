import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const wrongPath = resolve(dirName, 'files', 'wrongFilename.txt');
const renamePath = resolve(dirName, 'files', 'properFilename.md');
const errorMessage = 'FS operation failed';

const isExists = async (path) => {
    return fs.access(path)
        .then(() => true)
        .catch(() => false);
};

const rename = async () => {
    try {
        const isFileExists = await isExists(renamePath);
        if (isFileExists) {
          throw new Error(errorMessage);
        }
        await fs.rename(wrongPath, renamePath);
    } catch {
        throw new Error(errorMessage);
    }
};

await rename();
