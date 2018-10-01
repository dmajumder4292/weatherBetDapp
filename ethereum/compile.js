
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);


//const distributorPath = path.resolve(__dirname, 'contracts', 'DistributorToRetailer.sol');
//const manufacturerPath = path.resolve(__dirname, 'contracts', 'ManufacturerToDistributor.sol');
const weatherBetPath = path.resolve(__dirname, 'contracts', 'WeatherBet.sol');

//const distributorSource = fs.readFileSync(distributorPath, 'utf8');
//const manufacturerSource = fs.readFileSync(manufacturerPath, 'utf8');
const weatherBetSource = fs.readFileSync(weatherBetPath, 'utf8');


//const distributorOutput = solc.compile(distributorSource, 1).contracts;
//const manufacturerOutput = solc.compile(manufacturerSource, 1).contracts;
const weatherBetOutput = solc.compile(weatherBetSource, 1).contracts

fs.ensureDirSync(buildPath);

// for(let contract in distributorOutput) {
//      fs.outputJsonSync(
//          path.resolve(buildPath, contract.replace(':', '') + '.json'),
//          distributorOutput[contract]
//      );
//  }

// for(let contract in manufacturerOutput) {
//          fs.outputJsonSync(
//          path.resolve(buildPath, contract.replace(':', '') + '.json'),
//          manufacturerOutput[contract]
//      );
// }

for(let contract in weatherBetOutput) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        weatherBetOutput[contract]
    );
}