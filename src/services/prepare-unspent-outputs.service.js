import {getUnspentOutputs} from './blockchain-info.service';
import {NotEnoughFunds} from '../errors';

/*
Grabs unspent outputs from a given address and 
finds outputs that would be >= the amount.

A better solution would probably be to find the 
combination that gives the lowest number of UTXOs
>= to the amount.

This would essentially be a variation of the subset sum problem
*/
async function prepareUnspentOutputs(address, amount) {
    const unspentOutputs = await getUnspentOutputs(address);
    if(unspentOutputs.error != null){
        throw Error(unspentOutputs.message);
    }


    // Strategy one: try to find ouputs = to exact amount.
    let stratOneTotal = 0;
    let stratOneSelections = [];
    let stratOneSuccess = false;

    // Strategy two: first outputs that are >= two amount
    let stratTwoTotal = 0;
    let stratTwoSelections = [];
    let stratTwoSuccess = false;

    // Find strategy one and two results simultaniously.
    for (let i = 0; i < unspentOutputs.unspent_outputs.length; i++){        
        let unspentOutput = unspentOutputs.unspent_outputs[i];
        let value = unspentOutput.value;

        // While the amount hasn't been reached add
        // to strategy one total
        if((stratOneTotal + value) <= amount){
            stratOneTotal += value;
            stratOneSelections.push(unspentOutput);
        }


        // While strategy two hasn't succeded,
        // add to strategy two total
        if(stratTwoSuccess == false) {
            stratTwoTotal += value;
            stratTwoSelections.push(unspentOutput);
        }
 

        // If strat one has reached the amount,
        // break out of the loop and report strategy one success
        if(stratOneTotal == amount){
            stratOneSuccess = true;
            break;
        }

        // If strategy two is >= to the amount,
        // strategy two has succeeded, don't break
        // out of loop as strategy one might still succeed.
        if(stratTwoTotal >= amount) {
            stratTwoSuccess = true;
        }
    }

    // Strategy one is our preferred strategy, so
    // if that has succeeded, return selections from that
    if(stratOneSuccess == true){
        return stratOneSelections;
        // otherwise return strategy two selections
    } else if (stratTwoSuccess == true){
        return stratTwoSelections;
        // If strat one and two haven't succeded, return an error
    } else {
        throw new NotEnoughFunds();
    }

}


module.exports = {
    prepareUnspentOutputs
}