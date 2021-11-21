const cipher = require("./cipher");
const { pipeline } = require('stream');
const { stdout } = process;
const path = require('path');
const ReadFile = require('./read');
const WriteFile = require('./write');
const TransformFile = require('./transform');
const write = new WriteFile(path.join(__dirname, 'output.txt'));

const getResult = (flags) => {
    if (flags[3] === './input.txt') {
        const read = new ReadFile(path.join(__dirname, flags[3]));
        read.setEncoding('utf8');
        read.on('data', chunk => {
            const result = cipher.encryptMessage(chunk.toString(), flags[1])
            pipeline(
                result,
                write,
                err => err
            )
        })
    } else {
        stdout.write(`File ${flags[3]} not found. Please write message to encrypt\n`)
        stdout.write(`For finishing press Ctrl + C\n`);
        const transform = new TransformFile(flags[1]);
        if( flags[4] === './output.txt' || flags[5] === './output.txt') {
            process.stdin.pipe(transform).pipe(write);
        } else {
            process.stdin.pipe(transform).pipe(process.stdout);
        }
    }
}

module.exports = {
    getResult,
}
