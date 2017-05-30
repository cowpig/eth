pragma solidity ^0.4.10;

contract Test {
	mapping (bytes32 => uint8) public dict;

	function Test() {}

	function Set(bytes32 key, uint8 val) payable returns (uint8)  {
		dict[key] = val;
		return dict[key];
	}

	function Get(bytes32 key) returns (uint8) {
		return dict[key];
	}

}
