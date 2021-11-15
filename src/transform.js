const { Transform } = require('stream');
const cipher = require("./cipher");

class TransformFile extends Transform {
    constructor(options ={}) {
        super(options)
        this.config = options;
    }

    _transform(chunk, enc, callback){
        const result = cipher.encryptMessage(chunk.toString(), this.config);
        this.push(result)
        callback();
    }

    _flush(callback){
        this.push('Encryption completed \n')
        callback()
    }
}

module.exports = TransformFile;


