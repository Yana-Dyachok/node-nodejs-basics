import { copyFile, readdir, stat, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const copy = async () => {
    const sourceDir = resolve(dirName, 'files');
    const targetDir = resolve(dirName, 'files_copy');
    const errorMessage = 'FS operation failed';

    try {
        const sourceStats = await stat(sourceDir);
        if (!sourceStats.isDirectory()) {
            throw new Error(errorMessage);
        }

        try {
            const targetStats = await stat(targetDir);
            if (targetStats.isDirectory()) {
                throw new Error(errorMessage);
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await mkdir(targetDir);

        const files = await readdir(sourceDir);
        for (const file of files) {
            const srcPath = resolve(sourceDir, file);
            const destPath = resolve(targetDir, file);
            const statFile = await stat(srcPath);
            if (statFile.isDirectory()) {
                await copyFolder(srcPath, destPath);
            } else {
                await copyFile(srcPath, destPath);
            }
        }
    } catch {
        throw new Error(errorMessage);
    }
};

const copyFolder = async (src, dest) => {
    await mkdir(dest);
    const files = await readdir(src);
    for (const file of files) {
        const srcPath = resolve(src, file);
        const destPath = resolve(dest, file);

        const statFile = await stat(srcPath);
        if (statFile.isDirectory()) {
            await copyFolder(srcPath, destPath);
        } else {
            await copyFile(srcPath, destPath);
        }
    }
};

await copy();
