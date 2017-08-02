# eth

sandbox for playing with etherereum
in particular, the testrpc / web3 / solc flow

## installation

```bash
# install latest version of node, since ubuntu thinks 4.2 is up-to-date
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs npm

# make sure you're in the root directory and
npm install
```

## run the GiveAway example in a node repl

First, you need to run testrpc. 
I recommend opening opening two windows-side-by-side so that you can see changes to the blockchain in real-time.
```bash
./node_modules/.bin/testrpc
```

Now, check out the Solidity code in `giveaway/giveaway.sol`. That's the contract we're playing with here.

All it does is add people to a list, and if they're on the list, they're allowed to claim a `free_lunch` amount of ether from the contract by calling `ClaimEther`.

Now, let's open a node repl
```bash
node
```

And get started..
```javascript
// to mess around in node:
Solc = require('solc')
Web3 = require('web3')
// web3 instance to connect to our local blockchain
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```

web3 will return a [massive interface](https://github.com/ethereum/wiki/wiki/JavaScript-API)
```javascript
// compile our contract
contract_file = 'giveaway/giveaway.sol'
contract_name = ':GiveAway'
source_code = fs.readFileSync(contract_file).toString()
compiledContract = Solc.compile(source_code)
```

The compiledContract is kind of gnarly, but the important parts are the `abi` and the `bytecode`
```javascript
// a Contract's interface is defined by the "Application Binary Interface"
abi = compiledContract.contracts[contract_name].interface
GiveAwayContract =  web3.eth.contract(JSON.parse(abi))
```

`GiveAwayContract` is the contract's `class`, not an instance. To get it onto the blockchain, we need to deploy it by instantiating it.

```javascript
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
```

Now we should see stuff show up in the `testrpc` window:

```
eth_sendTransaction
eth_accounts
eth_sendTransaction

  Transaction: 0x58a1186c2f22d30b0a6f5893771aa2be63458c2f4adf68113d1c150fcd532105
  Contract created: 0xaa25b3b881542d115e5a619c80af1f7d3b0c1478
  Gas usage: 408047
  Block Number: 1
  Block Time: Wed Aug 02 2017 16:38:38 GMT-0400 (EDT)

eth_newBlockFilter
eth_getFilterChanges
eth_getTransactionReceipt
eth_getCode
eth_uninstallFilter
```

We can now add some ether to our GiveAway:

```javascript
// and add some ether to it
load_up = {
    from: admin_account, 
    to: deployed_contract.address, 
    value: web3.toWei(10, 'ether'),
}
deployed_contract.AddEth.sendTransaction(load_up)
```

Which, since it is a transaction, should also show up in `testrpc`. Now we can play around with this and make sure it works. Check out the rest of `giveaway.js` for some examples of things you can do.

