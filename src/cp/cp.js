import { fork } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    try {
        const childProcess = fork(path, args, { stdio: 'pipe' });
        process.stdin.pipe(childProcess.stdin);
        childProcess.stdout.pipe(process.stdout);
        process.on('SIGINT', () => {
            process.exit();
        });
    } catch {
        throw new Error('Error process');
    }
};

spawnChildProcess(['Argument1', 'Argument2', 'Argument3']);
