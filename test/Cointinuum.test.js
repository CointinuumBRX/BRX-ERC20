const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cointinuum", () => {
  let Token
  let ctmToken
  let owner
  let addr1
  let addr2
  const totalSupply = 110000000
  
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
    expect(decimals).to.equal(18);
  });

  it("Should have a total supply of 110000000", async () => {
    const totalSupply = await ctmToken.totalSupply();
    expect(totalSupply).to.equal(ethers.utils.parseEther("110000000"));
  });

  it("Should have the correct balance for the owner (msg.sender)", async () => {
    const balance = await ctmToken.balanceOf(owner.address);
    expect(balance).to.equal(ethers.utils.parseEther("110000000"));
  });

  it("Should transfer tokens correctly", async () => {
    const initialBalance = await ctmToken.balanceOf(addr1.address);
    expect(initialBalance).to.equal(0);

    const transferAmount = 111111111;
    await ctmToken.transfer(addr1.address, transferAmount);

    const finalBalance = await ctmToken.balanceOf(addr1.address);
    expect(finalBalance).to.equal(transferAmount);
  });

  it("Should approve and transferFrom tokens correctly", async () => {
    const initialBalance = await ctmToken.balanceOf(await addr2.address);
    expect(initialBalance).to.equal(0);

    const transferAmount = 11111111;
    ctmToken.transfer(addr2.address, transferAmount);
    const iBalance = await ctmToken.balanceOf(addr2.address);
    expect(iBalance).to.equal(transferAmount);

    const approveAmount = 11111111111;
    await ctmToken.connect(addr2).approve(owner.address, approveAmount);
    expect(await ctmToken.allowance(addr2.address, owner.address)).to.equal(approveAmount);

    await ctmToken.transferFrom( addr2.address, owner.address, transferAmount);

    const finalBalance = await ctmToken.balanceOf(addr2.address);
    expect(finalBalance).to.equal(0);

  });
});