class BlockchainInterface {
    constructor(provider) {
        this.web3 = new Web3(provider); // Assume Web3 is already imported
    }

    async sendTransaction(transaction) {
        const tx = {
            from: transaction.fromAddress,
            to: transaction.toAddress,
            value: this.web3.utils.toWei(transaction.amount.toString(), 'ether'),
            data: transaction.signature
        };

        const receipt = await this.web3.eth.sendTransaction(tx);
        return receipt;
    }

    async getTransactionStatus(txHash) {
        const txReceipt = await this.web3.eth.getTransactionReceipt(txHash);
        return txReceipt.status;
    }
}
