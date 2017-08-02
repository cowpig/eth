pragma solidity ^0.4.10;

contract GiveAway {
	enum ClaimStatus { None, Verified, Claimed }
	
	address public admin;
	mapping (bytes32 => ClaimStatus) private participants;
	uint constant free_lunch = 25000000000000000;
	
	function GiveAway(bytes32[] pre_verified) {
		admin = msg.sender;
		for (uint i = 0; i < pre_verified.length; i++) {
			participants[pre_verified[i]] = ClaimStatus.Verified;
		}
	}

	function AddEth () payable {}

	function ClaimEther(bytes32 claimant) {
		if (!CanClaim(claimant)) return;
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
