<h1 align="center">Ciphering CLI tool</h1>

**About**

This application allows you encode and decode a text by **3 substitution ciphers**:

* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
* [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

CLI tool should accept 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
    Config is a string with pattern `{XY(-)}n`, where:
* `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
* `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

**Usage**:
1. **Clone this branch**

   ` git clone https://github.com/Larkgronick/ciphering-CLI-tool.git`

2. **Check your Node Version**

    App uses streams, so for using it you need Node version 16+. Make sure that you using correct one (f.e via [nvm](https://github.com/nvm-sh/nvm))
3. **Run CLI** 

    In **terminal** inside downloaded folder run CLI command for encrypting message (see what options you need in **about** section).

**Example:**

```bash
$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

**Note**: **_input.txt_** and **_output.txt_** files supposed to be in **src** folder.

**Testing:**

Tests are written via [Jest](https://jestjs.io/) testing framework.
 Before running tests you need to install it and add to your dependencies:  
```bash
npm install --save-dev jest
```

Tests are stored in `test` folder.

For running tests execute command: 
```bash
npm run test
```
For checking coverage use this:
```bash
npm run coverage
```

