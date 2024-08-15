require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */

const {PRIVATE_KEY} =process.env;
module.exports = {
  solidity: "0.8.24",
};
