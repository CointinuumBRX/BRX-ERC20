// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//--------------------------------------
// Bricks: ERC20 Token contract
//
// Symbol      : BRX
// Name        : Bricks
// Total supply: 110000000
// Decimals    : 18
//--------------------------------------
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Bricks is ERC20{

    constructor() ERC20("Bricks", "BRX") {
        _mint(msg.sender, 110000000 * 10 ** uint256(decimals()));
    }
}