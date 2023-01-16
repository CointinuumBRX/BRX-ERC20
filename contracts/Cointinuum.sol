// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

//--------------------------------------
//  Cointinuum: ERC20 Token contract
//
// Symbol      : CTM
// Name        : Cointinuum
// Total supply: 110000000
// Decimals    : 18
//--------------------------------------
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Cointinuum is ERC20{

    constructor() ERC20("Cointinuum", "CTM") {
        _mint(msg.sender, 110000000 * 10 ** uint256(decimals()));
    }


}