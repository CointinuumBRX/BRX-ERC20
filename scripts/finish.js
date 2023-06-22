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
const tokenholders = require("../moreaddresses.json");
async function main() {
console.log(tokenholders)
const bricksAddress = "0x5ce6f2C0E2A1b4540894f286254bF13B1110D240"
const bricks = await hre.ethers.getContractAt("Bricks", bricksAddress);
  

console.log(`Bricks was deployed to: ${bricks.address}`);
  for (var i = 0; i < tokenholders.length; i++) {
    myvalue = ethers.utils.parseEther(tokenholders[i].balance);
    value = myvalue;
    console.log(`${i}Transferring ${value} to ${tokenholders[i].address}`)
    await bricks.transfer(tokenholders[i].address, value);
  }

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});