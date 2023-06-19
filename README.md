# Bricks Token Contract
running distribute.js with deploy Bricks token and distribute holdings
according to the file 'tokenlist.json'

'tokenlist.json' is generated using the scripts in migrateToken directory

```shell
npm i
edit tokenlist.json to verify addresses to get holdings CTM
cp .env.example .env
edit .env, paste in your PRIVATE_KEY

npx hardhat run scripts/distribute.js  // for a test run on hardhat network

npx hardhat run scripts/distribute.js --network mainnet

```
