
const Web3 = require('../ethereum/createWeb3');
const web3 = Web3.getWeb3Instance();

//const manufacturerToDistributor = require('../ethereum/build/ManufacturerToDistributor.json');
//const distributorToRetailer = require('../ethereum/build/DistributorToRetailer.json');

const weatherBet = require('../ethereum/build/WeatherBet.json')

const deployContracts = async () => {
    const accounts = await web3.eth.getAccounts();

    const weatherBetResult = await new web3.eth.Contract(JSON.parse(weatherBet.interface))
     .deploy({data : weatherBet.bytecode})
     .send({gas : '4000000', from : accounts[0]});

    // const distributorToRetailerResult = await new web3.eth.Contract(JSON.parse(distributorToRetailer.interface))
    // .deploy({data : distributorToRetailer.bytecode})
    // .send({gas : '1000000', from : accounts[1]});

    // console.log("manufacturer contract deployed to ", manufacturerToDistributorResult.options.address);

      console.log("mobile manufacturer contract deployed to ", weather.options.address);

}

deployContracts()
