const cipher = require('../src/cipher');
const { runCipherMachine, encryptMessage } = cipher;

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



