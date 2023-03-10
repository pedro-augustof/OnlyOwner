// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract OnlyOwner {
    address public owner;
    string private message;
    
    constructor(string memory initialMessage) {
        owner = msg.sender;
        message = initialMessage;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function seeMessage() public onlyOwner view returns(string memory) {
        return message;
    }
}