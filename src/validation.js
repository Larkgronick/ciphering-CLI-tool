const { stderr } = process;
const allowedConfig = ['C0', 'C1', 'R0', 'R1', 'A'];

const validateFlags = (flags) => {
    if(isDublicatedOption(flags)) {
        stderr.write(`Command has dublicating options, please change it \n `)
    } else if(!checkFlag(flags[0], ['-c', '--config'])) {
        stderr.write('Please set correct config flag \'-c\' or \'--config\' \n');
    } else if(!checkConfig(flags[1], allowedConfig)) {
        stderr.write('Config is wrong, please create a string with pattern {XY(-)}n \n');
    } else if(!checkFlag(flags[2], ['-i', '--input'])) {
        stderr.write(`Input flag is missing, please add it after config \'-i\' or \'--input\' \n: `);
    } else if(!checkOutput(flags, ['-o', '--output'])) {
        stderr.write(`Output flag is missing, please add it input option \'-o\'  or \'--output\' \n`);
    } else {
        return true;
    }
    process.exit();
}

const checkFlag = (flag, type) => type.includes(flag);

const checkConfig = (config, allowedConfig) => (config) ? config.split('-').every(el=> allowedConfig.includes(el)) : false;

const isDublicatedOption = (flags) => {
    const userFlags = flags.filter(el => el);
    return (new Set(userFlags).size !== userFlags.length);
};

const checkOutput = (flags, type) => type.includes(flags[3]) || type.includes(flags[4]);

module.exports = {
    validateFlags: validateFlags
}
