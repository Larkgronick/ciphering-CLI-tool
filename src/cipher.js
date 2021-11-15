const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

const doubleAlphabet = alphabet.concat(alphabet);
const reverseAlphabet = alphabet.slice().reverse();

const runCipherMachine = (message, shift, action, type) => {
    return message
        .split("")
        .map((el, i) => {
            const letter = el.toUpperCase();

            if (alphabet.includes(letter)) {
                if (alphabet.includes(el)) {
                    if (type === "C" || type === "R") {
                        if (action) {
                            return doubleAlphabet[doubleAlphabet.indexOf(el) + shift];
                        } else {
                            return doubleAlphabet[doubleAlphabet.lastIndexOf(el) - shift];
                        }
                    } else if (type === "A") {
                        return reverseAlphabet[doubleAlphabet.indexOf(letter)];
                    }
                } else {
                    if (type === "C" || type === "R") {
                        if (action) {
                            return doubleAlphabet[
                            alphabet.indexOf(letter) + shift
                                ].toLowerCase();
                        } else {
                            return doubleAlphabet[
                            doubleAlphabet.lastIndexOf(letter) - shift
                                ].toLowerCase();
                        }
                    } else if (type === "A") {
                        return reverseAlphabet[
                            doubleAlphabet.indexOf(letter)
                            ].toLowerCase();
                    }
                }
            } else {
                return el;
            }
        })
        .join("");
};

const encryptMessage = (message, config) => {
    return config.split("-").reduce((interim, el) => {
        let shift;
        if (el[0] === "C") {
            shift = 1;
        } else if (el[0] === "R") {
            shift = 8;
        }
        interim = runCipherMachine(interim, shift, parseInt(el[1]), el[0]);
        return interim;
    }, message)
}

module.exports = {
    encryptMessage: encryptMessage,
}
