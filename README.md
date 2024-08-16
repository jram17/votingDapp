# 🗳️ Voting DApp

## Overview
This is a decentralized voting application that allows users to securely cast their votes using their MetaMask wallet. The DApp leverages blockchain technology to ensure a transparent and immutable voting process.

## Features
- **🔗 MetaMask Integration:** Seamlessly connect your MetaMask wallet to participate in voting.
- **📊 Real-Time Voting Status:** Keep track of the remaining time and current voting status.
- **📋 Candidate Information:** View the list of candidates and their current vote counts.
- **✅ Secure Voting:** Each voter is restricted to a single vote, ensuring a fair and tamper-proof election.

## How to Use
1. **Connect your MetaMask wallet**: Click the connect button to link your wallet.
2. **Select a candidate**: Enter the candidate’s number you wish to vote for.
3. **Submit your vote**: Confirm your vote transaction through MetaMask.
4. **View results**: Check vote counts in real time.

## Tech Stack
- **Frontend:** React.js
- **Blockchain Library:** Ethers.js
- **Smart Contract:** Solidity
- **Blockchain:** Ethereum (Local development using Hardhat)

## How to Run 
1. clone the repo
2. download the node modules (npm i)
3. run the local network (hardhat) (npx hardhat node)
4. compile the smart contracts in another terminal while keeping the hardhat nodes running (npx hardhat compile)
5. deploy the smart contract (npx hardhat run scripts/deploy.js --network localhost)
6. update constants/constants.js with the deployed smartcontracts addresss
7. now move the frontend/react-app (cd frontend/react-app)
8. install the node modules for the react app (npm i)
9. start the react app(npm start)
10. login with your metamask account and perform operations...



