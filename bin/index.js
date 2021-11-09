#! /usr/bin/env node

const validation = require('./validation');
const data = require('./data');
const { argv } = process;

const flags = [argv[2], argv[3], argv[4], argv[5], argv[6], argv[7]];

const getResult =  async () => {
      await data.getInput(flags);
      process.exit();
}

if(validation.validateFlags(flags))   {
    getResult();
}
