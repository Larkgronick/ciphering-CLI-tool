const { stderr } = process;
const allowedConfig = ['C0', 'C1', 'R0', 'R1', 'A'];

const errors = {
    duplicate: `Command has duplicating options, please change it \n `,
    configFlag: 'Please set correct config flag \'-c\' or \'--config\' \n',
    configPattern: 'Config is wrong, please create a string with pattern {XY(-)}n \n',
    inputFlag: 'Input flag is missing, please add it after config \'-i\' or \'--input\' \n: ',
    outputFlag: 'Output flag is missing, please add it input option \'-o\'  or \'--output\' \n'
}


const validateFlags = (flags) => {
    if(isDuplicatedOption(flags)) {
        stderr.write(errors.duplicate)
    } else if(!checkFlag(flags[0], ['-c', '--config'])) {
        stderr.write(errors.configFlag);
    } else if(!checkConfig(flags[1], allowedConfig)) {
        stderr.write(errors.configPattern);
    } else if(!checkFlag(flags[2], ['-i', '--input'])) {
        stderr.write(errors.inputFlag);
    } else if(!checkOutput(flags, ['-o', '--output'])) {
        stderr.write(errors.outputFlag);
    } else {
        return true;
    }
    process.exit();
}

const checkFlag = (flag, type) => type.includes(flag);

const checkConfig = (config, allowedConfig) => (config) ? config.split('-').every(el=> allowedConfig.includes(el)) : false;

const isDuplicatedOption = (flags) => {
    const userFlags = flags.filter(el => el);
    return (new Set(userFlags).size !== userFlags.length);
};

const checkOutput = (flags, type) => type.includes(flags[3]) || type.includes(flags[4]);

module.exports = {
    validateFlags,
    isDuplicatedOption,
    checkFlag,
    checkConfig,
    validateFlags,
    allowedConfig,
    errors
}
