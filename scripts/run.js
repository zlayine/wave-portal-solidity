const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
	const [owner, randoPerson] = await ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
	await waveContract.deployed();
	console.log("Contract is deployed to:", waveContract.address);
	console.log("Contract is deployed by:", owner.address);

	let waveCount = await waveContract.getTotalWaves();

	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

	let waveTxn = await waveContract.wave("This is wave 1");
	await waveTxn.wait();

	// waveTxn = await waveContract.wave("This is wave 2");
	// await waveTxn.wait();

	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

	waveCount = await waveContract.getTotalWaves();

	let allWavers = await waveContract.getAllWaves();
	console.log(allWavers);

	let topWaver = await waveContract.getTopWaver();
	console.log(topWaver);


}

main()
.then( () => {
	process.exit(0);
}).catch((err) => {
	console.error(err);
	process.exit(1);
})