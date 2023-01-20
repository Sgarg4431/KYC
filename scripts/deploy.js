// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers}=require("hardhat");
async function main() {
  const Kyc=await ethers.getContractFactory("Kyc");
  const kyc=await Kyc.deploy();
  console.log(kyc.address);
}
//0x285C4DE1156716d847FA584D650eB627C7b1b517
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
