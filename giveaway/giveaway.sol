pragma solidity ^0.4.6;

contract GiveAway {
	enum ClaimStatus { None, Unclaimed, Claimed }
	
	address public admin;
	mapping (bytes32 => ClaimStatus) private claims;
	
	function GiveAway {
		// put $ in this address
	}

	function ClaimEther(bytes32 claimant, address addr) {
		require(claims[claimant] == Unclaimed);
		
		// create transaction to send $ to participant
		claims[claimant] = Claimed; // should only happen if transaction is confirmed
	}

	function AddParticipant(bytes32 participant) {
		require(msg.sender == admin);

		claims[participant] = Unclaimed;
	}
}