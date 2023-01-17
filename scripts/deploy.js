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

async function main() {

  const Cointinuum = await hre.ethers.getContractFactory("Cointinuum");
  const cointinuum = await Cointinuum.deploy();

  await cointinuum.deployed();

  console.log(`Cointinuum was deployed to: ${cointinuum.address}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});