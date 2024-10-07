import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';

const incNumber = 10;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'worker.js');

const performCalculations = async () => {
    const numberOfCores = cpus().length;
    const createWorker = (workerData) => {
        return new Promise((resolve) => {
            const worker = new Worker(path, { workerData });
            worker.on('message', (value) =>
                resolve({ status: 'resolved', data: value })
            );
            worker.on('error', () => resolve({ status: 'error', data: null }));
        });
    };

    const runWorkers = async () => {
        const workerPromises = [];

        for (let i = 0; i < numberOfCores; i++) {
            workerPromises.push(createWorker(incNumber + i));
        }
        const results = await Promise.all(workerPromises);
        return results;
    };

    try {
        const result = await runWorkers();
        console.log(result);
    } catch {
        throw new Error('Error');
    }
};

await performCalculations();
