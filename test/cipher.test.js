const cipher = require('../src/cipher');
const { runCipherMachine, encryptMessage } = cipher;

const input = 'This is secret. Message about "_" symbol!'

const commands = {
        one: 'node my_ciphering_cli -c C1-C1-R0-A -i ./input.txt -o ./output.txt',
        two: 'node my_ciphering_cli -c C1-C0-A-R1-R0-A-R0-R0-C1-A -i ./input.txt -o ./output.txt',
        three: 'node my_ciphering_cli -c A-A-A-R1-R0-R0-R0-C1-C1-A -i ./input.txt -o ./output.txt',
        four: 'node my_ciphering_cli -c C1-R1-C0-C0-A-R0-R1-R1-A-C1 -i ./input.txt -o ./output.txt'

}

const outputs = {
      one: 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!',
      two: 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!',
      three: 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!',
      four: 'This is secret. Message about "_" symbol!'
}

describe('cipher options', () => {
        test('cipher machine is work for caesar cipher', () => {
                expect(runCipherMachine('message', 1, 1, "C")).toEqual('nfttbhf');
                expect(runCipherMachine('message', 1, 0, "C")).toEqual('ldrrzfd');
        })

        test('cipher machine is work for caesar cipher with special characters', () => {
                expect(runCipherMachine('message123', 1, 1, "C")).toEqual('nfttbhf123');
                expect(runCipherMachine('message./?*', 1, 0, "C")).toEqual('ldrrzfd./?*');
        })

        test('cipher machine is work for rot cipher', () => {
                expect(runCipherMachine('message', 8, 1, "R")).toEqual('umaaiom');
                expect(runCipherMachine('message', 8, 0, "R")).toEqual('ewkksyw');
        })

        test('cipher machine is work for rot cipher with special characters', () => {
                expect(runCipherMachine('message123', 8, 1, "R")).toEqual('umaaiom123');
                expect(runCipherMachine('message./?*', 8, 0, "R")).toEqual('ewkksyw./?*');
        })

        test('cipher machine is work for atbash cipher', () => {
                expect(runCipherMachine('message', undefined, undefined, "A")).toEqual('nvhhztv');
        })

        test('cipher machine is work for rot atbash with special characters', () => {
                expect(runCipherMachine('message123', undefined, undefined, "A")).toEqual('nvhhztv123');
                expect(runCipherMachine('message./?*', undefined, undefined, "A")).toEqual('nvhhztv./?*');
        })
})

describe('usage scenarios from task description', () => {
        test('usage scenario #1', () => {
                expect(encryptMessage(input, commands.one.split(' ')[3])).toEqual(outputs.one);
        })

        test('usage scenario #2', () => {
                expect(encryptMessage(input, commands.two.split(' ')[3])).toEqual(outputs.two);
        })

        test('usage scenario #3', () => {
                expect(encryptMessage(input, commands.three.split(' ')[3])).toEqual(outputs.three);
        })

        test('usage scenario #4', () => {
                expect(encryptMessage(input, commands.four.split(' ')[3])).toEqual(outputs.four);
        })
})



