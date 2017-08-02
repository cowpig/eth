// imports
Solc = require('solc')
Web3 = require('web3')


// connect to our local blockchain
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


// compile our contract
contract_file = 'giveaway/giveaway.sol'
contract_name = ':GiveAway'
source_code = fs.readFileSync(contract_file).toString()
compiledContract = Solc.compile(source_code)


// a Contract's interface is defined by the "Application Binary Interface"
abi = compiledContract.contracts[contract_name].interface
GiveAwayContract =  web3.eth.contract(JSON.parse(abi))


// let's deploy this contract to our blockchain
bytecode = compiledContract.contracts[contract_name].bytecode;
admin_account = web3.eth.accounts[0]
contract_init_data = {
	data: bytecode,
	from: admin_account,
	gas: 1000000,
}
people = ['Laura', 'Gary'] // Laura and Gary are our starting participants
deployed_contract = GiveAwayContract.new(people, contract_init_data)


// and add some ether to it
load_up = {
	from: admin_account, 
	to: deployed_contract.address, 
	value: web3.toWei(10, 'ether'),
}
deployed_contract.AddEth.sendTransaction(load_up)

// play around with the contract
deployed_contract.VerifyParticipant('Alice', {from: admin_account})
deployed_contract.VerifyParticipant.sendTransaction('Bob', {from: admin_account})

deployed_contract.CanClaim.call('Alice')
deployed_contract.CanClaim.call(people[0])
deployed_contract.CanClaim.call(people[1])

alice = web3.eth.accounts[1]
bob = web3.eth.accounts[2]
laura = web3.eth.accounts[3]

deployed_contract.ClaimEther.sendTransaction('Bob', {from: bob})
deployed_contract.ClaimEther.sendTransaction('Laura', {from: laura})

web3.fromWei(web3.eth.getBalance(deployed_contract.address), "ether")
web3.fromWei(web3.eth.getBalance(laura), "ether")
web3.fromWei(web3.eth.getBalance(admin_account), "ether")

deployed_contract.End.sendTransaction({from: admin_account})
web3.fromWei(web3.eth.getBalance(admin_account), "ether")
