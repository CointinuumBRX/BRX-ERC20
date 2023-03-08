// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

//--------------------------------------
// Local Deployment Commands:
// npx hardhat node
// npx hardhat run --network localhost scripts/deploy.js
// 
// Goerli Deploy Commands:
// npx hardhat run --network goerli scripts/deploy.js
//--------------------------------------

// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
// const { parseUnits } = require("ethers/lib/utils");
const tokenholders = require("../tokenlist.json");
async function main() {
console.log(tokenholders)
  const Cointinuum = await hre.ethers.getContractFactory("Cointinuum");
  const cointinuum = await Cointinuum.deploy();

  await cointinuum.deployed();

  console.log(`Cointinuum was deployed to: ${cointinuum.address}`);
  let value = 1;
  let myvalue = 1.1;
  for (var i = 0; i < tokenholders.length; i++) {
    myvalue = ethers.utils.parseEther(tokenholders[i].balance);
    value = myvalue;
    //    value = ethers.BigNumber.from((tokenholders[i].balance*10^10));
    console.log(`Transferring ${value} to ${tokenholders[i].address}`)
    await cointinuum.transfer(tokenholders[i].address, value);
  }

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});