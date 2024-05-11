
const { ec: EC } = require('elliptic');
const { User } = require();
const ec = new EC('secp256k1');

class Wallet {
    constructor() {
        const keyPair = ec.genKeyPair();
        this.privateKey = keyPair.getPrivate('hex');
        this.publicKey = keyPair.getPublic('hex');
    }
  

    createTransaction(toAddress, amount) {
        const transaction = new Transaction(this.publicKey, toAddress, amount);
        transaction.signTransaction(ec.keyFromPrivate(this.privateKey));
        return transaction;
    }
}
module.exports = Wallet;

