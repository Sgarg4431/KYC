require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/b7JXsmQUiNSfb_7Q8ddfgeNMxL8baicc",
      accounts:[process.env.privateKey]
    }
  }
};
