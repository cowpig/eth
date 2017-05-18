pragma solidity ^0.4.10;

contract GiveAway {
	enum ClaimStatus { None, Verified, Claimed }
	
	address public admin;
	mapping (bytes32 => ClaimStatus) private participants;

	uint constant free_lunch = 300000000000000000;
	
	function GiveAway( ) { }

	function ClaimEther(bytes32 claimant, address addr) {
		// only verified participants get free ether
		if (participants[claimant] != ClaimStatus.Verified) return;

		// each participant only gets one free lunch
		participants[claimant] = ClaimStatus.Claimed;

		// create transaction to send $ to participant
		msg.sender.transfer(free_lunch);
	}

	function VerifyParticipant(bytes32 participant) {
		// only the admin can verify participants
		if (msg.sender != admin) return;

		participants[participant] = ClaimStatus.Verified;
	}
}
