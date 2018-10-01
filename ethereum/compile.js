
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);

const weatherBetPath = path.resolve(__dirname, 'contracts', 'WeatherBet.sol');

const weatherBetSource = fs.readFileSync(weatherBetPath, 'utf8');

const weatherBetOutput = solc.compile(weatherBetSource, 1).contracts

fs.ensureDirSync(buildPath);

for(let contract in weatherBetOutput) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        weatherBetOutput[contract]
    );
}
