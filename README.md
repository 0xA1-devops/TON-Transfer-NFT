# TON NFT Transfer

This repository contains a script for transferring Non-Fungible Tokens (NFTs) using Node.js in the TON (Telegram Open Network) blockchain network.

## Backstory

This script was created as a solution to a specific problem. I had transferred my TON Telegram Numbers NFTs to a SafePal wallet, which allows the use of a mnemonic and password but does not support NFTs. I found myself unable to import my wallet using the mnemonic and passphrase into any software that supports TON NFTs, as none currently do.

To address this, I wrote this script, which enabled me to transfer my NFTs back to a TON Keeper wallet. When I reached out to TON Keeper support, they informed me that the feature to import from a seed phrase was neither required nor interesting, and was unlikely to be implemented. SafePal support, meanwhile, assured me that TON NFT support would be implemented at some point in the future.

## Requirements

- Node.js
- `tonweb` npm package

## Usage

1. Install dependencies with `npm install`.
2. Change hexString, WalletClass, nftAddress, myAddress
3. Run the script with `node transfer.js`.

The script will log the sequence number and the result of the transfer operation.

## License

This project is licensed under the terms of the GPL-v2 license.

