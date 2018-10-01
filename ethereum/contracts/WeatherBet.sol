pragma solidity ^0.4.0;

contract WeatherBet{
    
    uint est_temp = 100;
    uint count;
    
    struct Bet {
        uint id;
        address higher;
        address lower;
        uint amount;
        bool betFinal;
        bool completed;
    }
    
    mapping (uint => Bet) bets;
    
    function createBet(uint betType) payable returns (uint id, address higher, address lower, uint amount) {
        require(msg.sender.balance >= msg.value);
        
        //bytes32 betId = keccak256(msg.sender, msg.value);
        count++;
        bets[count].id = count;
        if (betType == 1){
            bets[count].higher = msg.sender;
        } else {
            bets[count].lower = msg.sender;
        }
        bets[count].amount = msg.value;
        bets[count].completed = false;
        bets[count].betFinal = false;
        
        return (
            bets[count].id,
            bets[count].higher,
            bets[count].lower,
            bets[count].amount
        );
    }
    
    function acceptBet(uint _betId) payable returns (uint id, address higher, address lower, uint amount) {
        require(msg.sender.balance >= msg.value);
        require (bets[_betId].amount == msg.value);
        bets[_betId].lower = msg.sender;
        bets[_betId].betFinal = true;
        
         return (
            bets[_betId].id,
            bets[_betId].higher,
            bets[_betId].lower,
            bets[_betId].amount
        );
    }
    
    
    function result(uint _betId, uint _resTemp) returns (bool) {
        if (_resTemp > est_temp){
            bets[_betId].higher.transfer(2 * bets[_betId].amount);
        } else if (_resTemp < est_temp){
            bets[_betId].lower.transfer(2 * bets[_betId].amount);
        } else {
            bets[_betId].higher.transfer(bets[_betId].amount);
            bets[_betId].lower.transfer(bets[_betId].amount);
        }
        bets[_betId].completed = true;
    } 
}