const { expect } = require("chai");
const { ethers } = require("hardhat");

// npx hardhat test

describe("Cointinuum", () => {
  let Token
  let ctmToken
  let owner
  let addr1
  let addr2

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Cointinuum");
    ctmToken = await Token.deploy();
    await ctmToken.deployed();
  });

  it("Should have the correct name", async () => {
    const name = await ctmToken.name();
    expect(name).to.equal("Cointinuum");
  });

  it("Should have the correct symbol (CTM)", async () => {
    const symbol = await ctmToken.symbol();
    expect(symbol).to.equal("CTM");
  });

  it("Should have 18 decimals", async () => {
    const decimals = await ctmToken.decimals();
    expect(decimals.toNumber()).to.equal(18);
  });

  it("Should have a total supply of 110000000", async () => {
    const totalSupply = await ctmToken.totalSupply();
    expect(totalSupply.toNumber()).to.equal(110000000 * 10 ** 18);
  });

  it("Should have the correct balance for the owner (msg.sener)", async () => {
    const balance = await ctmToken.balanceOf(await owner.getAddress());
    expect(balance.toNumber()).to.equal(110000000 * 10 ** 18);
  });

  it("Should transfer tokens correctly", async () => {
    const initialBalance = await ctmToken.balanceOf(await addr1.getAddress());
    expect(initialBalance.toNumber()).to.equal(0);

    const transferAmount = 10 ** 18;
    await ctmToken.transfer(await addr1.getAddress(), transferAmount);

    const finalBalance = await ctmToken.balanceOf(await addr1.getAddress());
    expect(finalBalance.toNumber()).to.equal(transferAmount);
  });

  it("Should approve and transferFrom tokens correctly", async () => {
    const initialBalance = await ctmToken.balanceOf(await addr2.getAddress());
    expect(initialBalance.toNumber()).to.equal(0);

    const approveAmount = 10 ** 18;
    await ctmToken.approve(await addr1.getAddress(), approveAmount);
    expect(await ctmToken.allowance(await owner.getAddress(), await addr1.getAddress())).to.equal(approveAmount);

    const transferAmount = 5 * 10 ** 17;
    await ctmToken.transferFrom(await owner.getAddress(), await addr2.getAddress(), transferAmount);

    const finalBalance = await ctmToken.balanceOf(await addr2.getAddress());
    expect(finalBalance.toNumber()).to.equal(transferAmount);
  });
});