// import {https} from https;
const https = require('https');

/*
Function to get UTXOs from blockchain.info with a
given address
*/
async function getUnspentOutputs(address) {
  const options = {
    hostname: 'blockchain.info',
    path: `/unspent?active=${address}`,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    let data = '';
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data)
    req.end();
  });

}

module.exports = {
  getUnspentOutputs
}