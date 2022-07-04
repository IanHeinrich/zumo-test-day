import { NotEnoughFunds } from '../errors';
import {logError} from '../services/logger.service'
import {prepareUnspentOutputs} from '../services/prepare-unspent-outputs.service';

async function get(req, res, next){
    try {
        const address = req.query.address;
        const amount = req.query.amount;
        if(address == null){
            return res.status(400).send({'message': 'missing address'}).send();
        }
        if(amount == null){
            return res.status(400).send({'message': 'missing amount'}).send();
        }
        const result = await prepareUnspentOutputs(address, amount);
        return res.status(200).send(result);
    } catch (e) {
        if(e instanceof NotEnoughFunds) {
            return res.status(409, e.message).send({'message': e.message});
        } else {
            logError(e.status, req.method, req.url, e);
            return res.status(400, e.message).send({'message': e.message});
        }
    }

}

module.exports = {
    get
}