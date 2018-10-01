
const Web3 = require('../ethereum/createWeb3');
const web3 = Web3.getWeb3Instance();

const weatherBet = require('../ethereum/build/WeatherBet.json')

const deployContracts = async () => {
    const accounts = await web3.eth.getAccounts();

    const weatherBetResult = await new web3.eth.Contract(JSON.parse(weatherBet.interface))
     .deploy({data : weatherBet.bytecode})
     .send({gas : '4000000', from : accounts[0]});

      console.log("mobile manufacturer contract deployed to ", weather.options.address);

}

deployContracts()
