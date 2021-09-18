const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying WavePortal with the account:", deployer.address);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const tokenFactory = await ethers.getContractFactory("WavePortal");
	const tokenContract = await tokenFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});

	console.log("WavePortal address:", tokenContract.address);
}

main()
.then(() => { process.exit(0); })
.catch((err) => {
	console.log(err)
	process.exit(1);
});