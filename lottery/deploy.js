const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const util = require('util');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'desert shadow throw copper witness sniff close honey myth cat stick rail',
  'https://rinkeby.infura.io/v3/fb4eab6afc13420797b15a324fabf564'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(util.inspect(abi, false, null, true));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
