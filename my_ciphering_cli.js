#! /usr/src/env node
const validation = require('./src/validation');
const data = require('./src/data');
const { argv } = process;
const flags = [argv[2], argv[3], argv[4], argv[5], argv[6], argv[7]];

if(validation.validateFlags(flags)) {
    data.getResult(flags);
}

