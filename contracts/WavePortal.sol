
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
	uint totalWaves;
	uint private seed;

	event NewWave(address indexed from, uint timestamp, string message);

	event Winner(address indexed waver);

	struct Wave {
		address waver;
		string message;
		uint timestamp;
	}

	//adding a count for each waver
	mapping(address => uint) waverCount;

	mapping(address => uint) lastWavedAt;
	Wave[] waves;

	constructor() payable {
		console.log("Yo yo, I am a contract and I am smart!");
	}

	function wave(string memory _message) public {
		// require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15 min");
		lastWavedAt[msg.sender] = block.timestamp;
		
		waverCount[msg.sender] += 1;
		totalWaves += 1;
		console.log("%s has waved with a message: %s!", msg.sender, _message);

		waves.push(Wave(msg.sender, _message, block.timestamp));
		emit NewWave(msg.sender, block.timestamp, _message);

		uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;
		console.log("Random # generated: %s", randomNumber);

		seed = randomNumber;

		if (randomNumber < 50) {
			uint prizeAmount = 0.0001 ether;
			require(prizeAmount <= address(this).balance, "Balance is insufficent");
			(bool success, ) = (msg.sender).call{value: prizeAmount}();
			require(success, "Failed to withdraw money from contract");
			emit Winner(msg.sender);
		}
	}

    
    

	function getTotalWaves() view public returns (uint) {
		console.log("We have %d total waves!", totalWaves);
		return totalWaves;
	}

	function getAllWaves() view public returns (Wave[] memory) {
		return waves;
	}

	function getTopWaver() view public returns (Wave memory _top) {
		for(uint i = 0; i < waves.length; i++) {
			if (waverCount[waves[i].waver] > waverCount[_top.waver])
				_top = waves[i];
		}
	}

}
