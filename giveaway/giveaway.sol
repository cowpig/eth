
pragma solidity ^0.4.10;

contract GiveAway {
	enum ClaimStatus { None, Verified, Claimed }
	
	address public admin;
	mapping (bytes32 => ClaimStatus) private participants;
	uint constant free_lunch = 25000000000000000;
	
	function GiveAway() {
		admin = msg.sender;
	}

	function AddEth () payable {}

	function ClaimEther(bytes32 claimant) {
		if (participants[claimant] != ClaimStatus.Verified) return;
		participants[claimant] = ClaimStatus.Claimed;
		if (!msg.sender.send(free_lunch))
			participants[claimant] = ClaimStatus.Verified;
	}

	function VerifyParticipant(bytes32 participant) {
		if (msg.sender != admin) return;
		participants[participant] = ClaimStatus.Verified;
	}

	function CanClaim(bytes32 participant) returns (bool) {
		return participants[participant] == ClaimStatus.Verified;
	}

	function End() {
		if (msg.sender != admin) return;
		selfdestruct(admin);
	}
}


