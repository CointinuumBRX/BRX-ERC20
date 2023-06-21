# Bricks Token Contract
running distribute.js with deploy Bricks token and distribute holdings
according to the file 'tokenlist.json'

'tokenlist.json' is generated using the scripts in migrateToken directory
this contains the current token from the CTM contract

```shell
npm i
cp .env.example .env
// edit .env, paste in YOUR PRIVATE_KEY

// for a test run on hardhat network, will print all distributions
npx hardhat run scripts/distribute.js  

npx hardhat run scripts/distribute.js --network mainnet

```
