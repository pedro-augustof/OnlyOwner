const path = require("path");
const fs = require("fs");
const solc = require("solc");

const onlyOwnerPath = path.resolve(__dirname, "contracts", "OnlyOwner.sol");
const source = fs.readFileSync(onlyOwnerPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
        'OnlyOwner.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['OnlyOwner.sol'].OnlyOwner;
