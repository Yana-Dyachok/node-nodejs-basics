import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
    process.stdout.write(
        "Let's transform text. If you want to exit, please press Ctrl+C\nPlease enter any text and press 'Enter':\n"
    );

    const transformStream = new Transform({
        transform(data, _, callback) {
            const reversedData =
                data.toString().trim().split('').reverse().join('') + '\n';
            callback(null, reversedData);
        },
    });

    await pipeline(process.stdin, transformStream, process.stdout);
    process.on('SIGINT', () => {
        process.exit();
    });
};

await transform();
