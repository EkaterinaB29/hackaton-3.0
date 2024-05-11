const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1'); // The elliptic curve used by Bitcoin

class Wallet {
    constructor() {
        const keyPair = ec.genKeyPair();
        this.privateKey = keyPair.getPrivate('hex');
        this.publicKey = keyPair.getPublic('hex');
    }
   

    signTransaction(transaction) {
        const hashTx = this.calculateTransactionHash(transaction);
        const sig = ec.keyFromPrivate(this.privateKey, 'hex').sign(hashTx, 'base64');
        transaction.signature = sig.toDER('hex');
    }

    calculateTransactionHash(transaction) {
        return SHA256(transaction.fromAddress + transaction.toAddress + transaction.amount + transaction.timestamp).toString();
    }

    createTransaction(toAddress, amount) {
        if (!toAddress || !amount) {
            throw new Error('Transaction must include to address and amount.');
        }

        const transaction = {
            fromAddress: this.publicKey,
            toAddress: toAddress,
            amount: amount,
            timestamp: Date.now(),
            signature: null
        };

        this.signTransaction(transaction);
        return transaction;
    }
}
