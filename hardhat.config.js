require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const private = require("./privatekey.js");

module.exports = {
  solidity: "0.8.4",
	networks: {
		rinkeby: {
			url: "https://eth-rinkeby.alchemyapi.io/v2/ld5QYrQtMh7BzVzFz56XWG3xpgzk2v3I",
			accounts: [private.key]
		}
	}
};
