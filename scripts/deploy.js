const { ethers } = require("hardhat");

async function main(){
    const Voting=await ethers.getContractFactory('Voting');
    const Voting_=await Voting.deploy(["venke","anpu","kavin","jayaram"],200);
    console.log("contract address:",Voting_.address);
}

main().then(()=>process.exit(0))
    .catch(err=>{
        console.log(err);
        process.exit(1);
    });