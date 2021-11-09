const { stderr } = process;
const allowedConfig = ['C0', 'C1', 'R0', 'R1', 'A'];

const validateFlags = (flags) => {
    if(isDublicatedOption(flags)) {
        stderr.write(`Command has dublicating options, please change it \n `)
    } else if(!checkFlag(flags[0], '-c')) {
        stderr.write('Please set correct config flag \'-c\' \n');
    } else if(!checkConfig(flags[1], allowedConfig)) {
        stderr.write('Config is wrong, please create a string with pattern {XY(-)}n \n');
    } else if(!checkFlag(flags[2], '-i')) {
        stderr.write(`Input flag is missing, please add it after config \'-i\' \n: `);
    } else if(!checkOutput(flags)) {
        stderr.write(`Output flag is missing, please add it input option \'-o\' \n`);
    } else {
        return true;
    }
    process.exit();
}

const checkFlag = (flag, type) => flag === type;

const checkConfig = (config, allowedConfig) => (config) ? config.split('-').every(el=> allowedConfig.includes(el)) : false;

const isDublicatedOption = (flags) => {
    const userFlags = flags.filter(el => el);
    return (new Set(userFlags).size !== userFlags.length);
};

const checkOutput = (flags) => flags[3] === '-o' || flags[4] === '-o';

module.exports = {
    validateFlags: validateFlags
}
