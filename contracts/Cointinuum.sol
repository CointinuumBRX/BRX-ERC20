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

contract Cointinuum {

    bytes32 public name;
    bytes32 public symbol;
    uint256 public decimals; // Looking into changing this value to a lower uint value for saving gas
    uint256 private initialSupply;
    uint256 public _totalSupply;
    address private owner;
    uint256 public constant MAX_TOTAL_SUPPLY = 110000000*10**18; // MAX SUPPLY CONST

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {

        name = "Cointinuum";
        symbol = "CTM";
        decimals = 18;
        _totalSupply = 110000000 * 10 ** uint256(decimals);
        require(_totalSupply <= MAX_TOTAL_SUPPLY); // MAX SUPPLY CHECK 
        initialSupply = _totalSupply;
        balances[msg.sender] = _totalSupply;
        owner = msg.sender;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address tokenOwner) public view returns (uint256 balance) {
        return balances[tokenOwner];
    }

    function approve(address spender, uint256 tokens) public returns (bool) {
        require(spender != address(0));
        require(tokens <= _totalSupply);

        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view returns (uint256 remaining) {
        return allowed[tokenOwner][spender];
    }

    function transfer(address to, uint256 tokens) public returns (bool) {
        require(to != address(0), "Address cannot be 0x0...");
        require(tokens <= balances[msg.sender]);
        require(_totalSupply + tokens <= MAX_TOTAL_SUPPLY, "Total supply can't exceed the maximum supply"); // MAX SUPPLY DOUBLE CHECK

        balances[msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint256 tokens) public returns (bool) {
        require(to != address(0), "Address cannot be 0x0...");
        require(tokens <= balances[from]);
        require(tokens <= allowed[from][msg.sender]);
        require(_totalSupply + tokens <= MAX_TOTAL_SUPPLY, "Total supply can't exceed the maximum supply"); // MAX SUPPLY TRIPLE CHECK

        balances[from] -= tokens;
        allowed[from][msg.sender] -= tokens;
        balances[to] += tokens;
        emit Transfer(from, to, tokens);
        return true;
    }
}