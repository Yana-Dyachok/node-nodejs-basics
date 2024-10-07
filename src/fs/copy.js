import { copyFile, readdir, stat, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const sourceDir = resolve(__dirname, 'files');
    const targetDir = resolve(__dirname, 'files_copy');
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
