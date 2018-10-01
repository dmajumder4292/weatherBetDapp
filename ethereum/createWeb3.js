const Web3 = require('web3');
var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "access carpet olympic service heart tissue lucky pill dress ball half share";

let web3 = null;
module.exports = {
    getWeb3Instance : function(){
        if (web3 === null) {
            const provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/b13e328e12fa4a1bb93c4097b7241e6e");
            web3 = new Web3(provider);
        } 
        return web3;
    }
};
