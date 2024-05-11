const Web3 = require('web3');

class BlockchainInterface {
    constructor(provider) {
        try {
            this.web3 = new Web3(provider);
        } catch (error) {
            console.error('Failed to instantiate Web3:', error);
        }
    }
    /**
     * Check if a transaction is possible based on the account balance and gas fees.
     * @param {string} fromAddress - The Ethereum address derived from the public key.
     * @param {string} toAddress - The recipient's Ethereum address.
     * @param {number} amount - The amount to send.
     * @returns {Promise<boolean>} - Whether the transaction is possible.
     */async checkTransactionPossible(fromAddress, toAddress, amount) {
    try {
        const balanceWei = await this.web3.eth.getBalance(fromAddress);
        const gasPrice = await this.web3.eth.getGasPrice();
        const estimatedGas = await this.web3.eth.estimateGas({
            to: toAddress,
            value: this.web3.utils.toWei(amount.toString(), 'ether')
        });

        // Calculate the total cost in wei directly to avoid multiple conversions
        const totalCostWei = (estimatedGas * gasPrice) + this.web3.utils.toWei(amount.toString(), 'ether');

        // Compare directly in wei
        return totalCostWei <= balanceWei;
    } catch (error) {
        console.error("Error checking transaction possibility:", error);
        // Optionally, handle differently or structure the error information into a response object
        return { success: false, error: error.message };
    }
}


    /**
     * Send a transaction to the Ethereum blockchain with dynamic gas calculation and enhanced security.
     * @param {Object} transaction - The transaction object containing the necessary data.
     * @returns {Promise<Object>} - The transaction receipt.
     */
    async sendTransaction(transaction) {
        // Retrieve current gas price from the network to ensure the transaction is competitive
        const gasPrice = await this.web3.eth.getGasPrice();

        // Estimate gas limit for the transaction, adjusting based on the complexity of the transaction
        const gasLimit = await this.web3.eth.estimateGas({
            to: transaction.toAddress,
            value: this.web3.utils.toWei(transaction.amount.toString(), 'ether'),
            data: transaction.data,
        });

        // Sign the transaction with security best practices
        const signedTx = await this.web3.eth.accounts.signTransaction({
            to: transaction.toAddress,
            value: this.web3.utils.toWei(transaction.amount.toString(), 'ether'),
            gas: gasLimit,
            gasPrice: gasPrice,
            data: transaction.data,
        }, transaction.privateKey); // The private key must be handled securely and never exposed

        // Send the signed transaction and handle potential errors robustly
        try {
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return receipt;
        } catch (error) {
            console.error("Failed to send transaction:", error);
            throw new Error("Transaction failed: " + error.message);
        }
    }

    /**
     * Get the status of a transaction using its hash.
     * @param {string} txHash - The transaction hash.
     * @returns {Promise<string>} - The status of the transaction.
     */
    async getTransactionStatus(txHash) {
        try {
            const txReceipt = await this.web3.eth.getTransactionReceipt(txHash);
            if (txReceipt && txReceipt.status) {
                // Check if the transaction was successful
                return 'Success';
            } else {
                return 'Failed';
            }
        } catch (error) {
            console.error("Failed to retrieve transaction status:", error);
            throw new Error("Error retrieving transaction status");
        }
    }
}

module.exports = BlockchainInterface;
