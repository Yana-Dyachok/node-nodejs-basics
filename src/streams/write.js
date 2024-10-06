import { createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const path = resolve(dirName, 'files', 'fileToWrite.txt');

const write = async () => {
    try {
        process.stdout.write(
            "Let's create a file. If you want to exit, please enter 'exit' or press Ctrl+C\nPlease enter any text:\n"
        );
        const output = createWriteStream(path, { flags: 'w' });

        process.stdin.on('data', (chunk) => {
            if (chunk.toString().trim() === 'exit') {
                output.end();
                process.exit();
            } else {
                output.write(chunk);
            }
        });

        process.on('SIGINT', () => {
            process.exit();
        });
    } catch {
        throw new Error('Error writing');
    }
};

await write();
