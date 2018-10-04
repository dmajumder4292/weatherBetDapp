const Web3 = require('../ethereum/createWeb3');
const web3 = Web3.getWeb3Instance();
var request = require('request');

const weatherBet = require('../ethereum/build/WeatherBet.json');


var WeatherBetInstance = new web3.eth.Contract(JSON.parse(weatherBet.interface))
var accounts, account;

function getBalance(address) {
    return web3.fromWei(web3.eth.getBalance(address).toNumber(), 'ether');
}

window.App = { 
    start: function() {
        var self = this;

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
	accounts = accs;

	$("#playerAddress").text(web3.eth.accounts[0]); //prints account address
	    console.log(accounts);
	    console.log("uSER iS cREATED");  
	    self.initializeConference();
	});
    },

    initializeConference: function() {
        var self = this;
	
        WeatherBetInstance.deployed().then(function(instance) {
            $("#confAddress").html(instance.address);

            //self.checkValues();
        }).catch(function(e) {
            console.log(e);
        });

    },

    createBet: function(betType, value) {
        WeatherBetInstance.deployed().then(function(instance) {
            instance.createBet(betType, {from: accounts[0], gas: 3000000, value: value}).then(function(result){
                console.log(result);
            })
        })
    },

    acceptBet: function(betID, value) {
        WeatherBetInstance.deployed().then(function(instance) {
            instance.acceptBet(betID, {from: accounts[0], gas: 3000000, value: value}).then(function(result){
                console.log(result);
            })
        })
    },

    result: async function(betID) {
        WeatherBetInstance.deployed().then(function(instance) {
            var _resTemp;
            var url = "http://api.openweathermap.org/data/2.5/forecast?q=london,us&mode=json&appid=aad54055817b7630b3545053cfe8fed5";
            await request(url, function(error, response, body){
                if(!error && response.statusCode == 200){
                    var results = JSON.parse(body);
                    var temp = results.list[0].main.temp;
                    _resTemp = temp;
                }
            });
            instance.result(betID, _resTemp, {from: accounts[0], gas: 3000000}).then(function(result){
                console.log(result);
            })
        })
    },
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    WeatherBetInstance.setProvider(web3.currentProvider);
    App.start();


    $("#BetCreate").click(function() {
       var betType = $("#ch").val();
       var value = $("#cba").val()
       App.createBet(betType, value);
    });
	
    $("#BetAccept").click(function() {
       var betID = $("#betid").val();
       var value = $("#aba").val();
       App.acceptBet(betID, value);
    });
	
    $("#BetResult").click(function() {
       var betID = $("#resbetid").val();
       App.result(betID);
    });
});
