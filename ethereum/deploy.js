const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/ForumFactory');

const provider = new HDWalletProvider(
    //give access to account mnemonic
    'relax safe eager uphold toddler spare vote crucial mean science raccoon height',
    //link to RinkeBy network
    'https://rinkeby.infura.io/v3/3df3446a077546a8aeba10bd83191704'
);
const web3 = new Web3(provider);

const deploy = async () => {
    //get all the accounts
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({
            data: '0x' + compiledFactory.bytecode,
            arguments: []
        })
        .send({
            from: accounts[0]
        });

    // console.log(compiledFactory.interface);
    console.log('Contract deployed to', result.options.address);
};
deploy();