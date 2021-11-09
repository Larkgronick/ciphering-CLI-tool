
const fs = require('fs');
const path = require('path');
const cipher = require("./cipher");
const { stderr, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'output.txt'), 'utf-8');

const getInput = async (flags) => {
    let message = '';
    if (flags[3] === './input.txt') {
        const input = fs.createReadStream(path.join(__dirname, 'input.txt'), 'utf-8');
        return new Promise(resolve => {
            input.on('data', chunk => message += chunk);
            input.on('end', () => {
                resolve(message);
                setOutput(flags, message);
            });
            input.on('error', () => {
                stderr.write('Input is not found, please create it \n');
            });
        })
    } else {
        const rl = require('readline').createInterface({input: stderr, output: stdout});
        return new Promise((resolve) => {
            rl.question('Type message to encrypt: \n', (data) => {
                message = data;
                resolve(message)
                stdout.write(`Encryption completed! Result is: \n${cipher.encryptMessage(message, flags[1])} \n`)
                rl.close()
            })
        })
    }
}

const setOutput = (flags, message) => {
    const result = cipher.encryptMessage(message, flags[1]);
    if(flags[4] === './output.txt' || flags[5] === './output.txt') {
        try {
            fs.readFileSync(path.join(__dirname, 'output.txt'), 'utf8')
            stdout.write('File is written. See encrypted message inside \n')
            output.write(result);
        } catch (err) {
            stderr.write('File not found, please create it \n')
        }
    } else {
        stdout.write(`Encryption completed! Result is: \n${result}`)
    }
}

module.exports = {
    getInput: getInput,
}
