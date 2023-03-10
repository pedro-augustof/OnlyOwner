const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let OnlyOwner;
const INITIAL_STRING = 'Hi there!';

let owner;
let nonOwner;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    owner = accounts[0];
    nonOwner = accounts[2];

    // Use one of those accounts to deploy the contract
    OnlyOwner = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [INITIAL_STRING] })
        .send({ from: owner, gas: '1000000' });
});

describe('OnlyOwner', () => {
    it('Only the owner can see the message', async () => {
        const message = await OnlyOwner.methods.seeMessage().call({ from: owner });
        assert.equal(message, INITIAL_STRING);
    });

    it('nonOwner cannot see the message', async () => {
        try{
            await OnlyOwner.methods.seeMessage().call({ from: nonOwner });
        } catch (error) {
            assert(error.message.includes('revert'), `Expected "revert", got ${error}`);
        }
    });
});