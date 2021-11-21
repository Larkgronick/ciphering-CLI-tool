const validation = require('../src/validation');
const { isDuplicatedOption, checkFlag, checkConfig, validateFlags, errors, allowedConfig } = validation;

const passCommand = (input) => input.split(' ');

const commands = {
        full: 'node my_ciphering_cli -c C1-C1-R0-A -i ./input.txt -o ./output.txt',
        duplicate: 'node my_caesar_cli -c C1-C1-A-R0 -c C0',
        noConfigFlag: 'node my_caesar_cli C1-C1-A-R0 -c C0',
        incorrectConfig: 'node my_caesar_cli -c C1-C1-A-B1 -i -o',
        noInputFlag: 'node my_caesar_cli -c C1-C1-A -o',
        noOutputFlag: 'node my_caesar_cli -c C1-C1-A -i'
}

describe('validation functions', () =>{
        test('if user passes the same cli argument twice dublication check should return true', () => {
                expect(isDuplicatedOption(passCommand(commands.duplicate))).toBeTruthy()
        })

        test('command should have config flag', () => {
                const configFlags = ['-c', '--config'];
                expect(checkFlag(passCommand(commands.noConfigFlag)[2], configFlags)).toBeFalsy()
        })

        test('config should be correct', () => {
                const command = 'node my_caesar_cli -c C1-C1-A-B1 -c C0';
                expect(checkConfig(passCommand(commands.incorrectConfig)[3], allowedConfig)).toBeFalsy()
        })
})


describe('user validation', () =>{
        const write = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);

        test('when all command in place it should mean success validation', () => {
                const exit = jest.spyOn(process, 'exit').mockImplementation(() => {});
                validateFlags(passCommand(commands.full));
                expect(exit).toHaveBeenCalled();
                expect(validateFlags(passCommand(commands.full).slice(2))).toBeTruthy();
        })

        test('throw an error if duplication found', () => {
                const command = 'node my_caesar_cli -c C1-C1-A-R0 -c C0';
                validateFlags(passCommand(commands.duplicate).slice(2));
                expect(write).toHaveBeenLastCalledWith(errors.duplicate);
        })

        test('throw an error if config is wrong', () => {
                const command = 'node my_caesar_cli -c C1-C1-A-B1 -i -o';
                validateFlags(passCommand(commands.incorrectConfig).slice(2))
                expect(write).toHaveBeenLastCalledWith(errors.configPattern)
        })

        test('throw an error if input flag is missing', () => {
                const command = 'node my_caesar_cli -c C1-C1-A -o';
                validateFlags(passCommand(commands.noInputFlag).slice(2));
                expect(write).toHaveBeenLastCalledWith(errors.inputFlag);
        })

        test('throw an error if output flag is missing', () => {
                const command = 'node my_caesar_cli -c C1-C1-A -i';
                validateFlags(passCommand(commands.noOutputFlag).slice(2));
                expect(write).toHaveBeenLastCalledWith(errors.outputFlag);
        })
})
