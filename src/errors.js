class NotEnoughFunds extends Error {
    constructor(message = 'Not enough funds', ...params) {
      super(...params);
        
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotEnoughFunds);
      }
  
      this.name = 'NotEnoughFunds';
      this.message = message;
      this.date = new Date();
    }
}

module.exports = {
    NotEnoughFunds
}