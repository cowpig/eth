pragma solidity ^0.4.6;

contract GiveAway {
	enum ClaimStatus { None, Verified, Claimed }
	
	address public admin;
	mapping (bytes32 => ClaimStatus) private participants;

	uint constant free_lunch = 0.03;
	
	function GiveAway {	}

	function ClaimEther(bytes32 claimant, address addr) {
		// only verified participants get free ether
		require(participants[claimant] == Verified);
		participants[claimant] = Claimed;

		// create transaction to send $ to participant
		msg.sender.transfer(free_lunch);
	}

	function VerifyParticipant(bytes32 participant) {
		// only the admin can verify participants
		require(msg.sender == admin);

		participants[participant] = Verified;
	}
}
