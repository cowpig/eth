contract_file = 'test/test.sol'
contract_name = ':Test'

Solc = require('solc')
Web3 = require('web3')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
source_code = fs.readFileSync(contract_file).toString()

compiledContract = Solc.compile(source_code)
abi = compiledContract.contracts[contract_name].interface
bytecode = compiledContract.contracts[contract_name].bytecode;
ContractClass =  web3.eth.contract(JSON.parse(abi))

contract_init_data = {
	data: bytecode,
	from: web3.eth.accounts[0],
	gas: 1000000,
}

deployed_contract = ContractClass.new(contract_init_data)

web3.fromWei(web3.eth.getBalance(deployed_contract.address), "ether")
acc = web3.eth.accounts[0]
web3.fromWei(web3.eth.getBalance(deployed_contract.address), "ether")
deployed_contract.Get.call("akey")

// call on set doesn't work...
