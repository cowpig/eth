contract_file = 'giveaway/giveaway.sol'
contract_name = ':GiveAway'

Solc = require('solc')
Web3 = require('web3')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
source_code = fs.readFileSync(contract_file).toString()

admin_account = web3.eth.accounts[0]

compiledContract = Solc.compile(source_code)
abi = compiledContract.contracts[contract_name].interface
bytecode = compiledContract.contracts[contract_name].bytecode;
ContractClass =  web3.eth.contract(JSON.parse(abi))

contract_init_data = {
	data: bytecode,
	from: admin_account,
	gas: 1000000,
}

deployed_contract = ContractClass.new(contract_init_data)

load_up = {
	from: admin_account, 
	to: deployed_contract.address, 
	value: web3.toWei(10, 'ether'),
}
deployed_contract.AddEth.sendTransaction(load_up)

deployed_contract.VerifyParticipant.sendTransaction('Alice', {from: admin_account})
deployed_contract.VerifyParticipant.sendTransaction('Bob', {from: admin_account})

deployed_contract.CanClaim.call('Alice')

alice = web3.eth.accounts[1]
bob = web3.eth.accounts[1]

deployed_contract.ClaimEther.sendTransaction('Alice', {from: alice})
deployed_contract.ClaimEther.sendTransaction('Bob', {from: bob})

web3.fromWei(web3.eth.getBalance(deployed_contract.address), "ether")
web3.fromWei(web3.eth.getBalance(bob), "ether")
web3.fromWei(web3.eth.getBalance(admin_account), "ether")

deployed_contract.End.sendTransaction({from: admin_account})
web3.fromWei(web3.eth.getBalance(admin_account), "ether")
