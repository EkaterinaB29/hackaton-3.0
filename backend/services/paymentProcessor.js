class PaymentProcessor {
    constructor(blockchainInterface, user) {
        this.blockchainInterface = blockchainInterface;
        this.user = user;
    }

    async processPayment(fromAddress, toAddress, amount) {
        try {
            // Convert the amount from the original currency (crypto) to the desired currency (fiat or another crypto)
            
            //const amountInWei = this.blockchainInterface.web3.utils.toWei(convertedAmount.toString(), 'ether');

            // Create the transaction object
            const transaction = {
                from: fromAddress,
                to: toAddress,
                value: amount,  // Ensure this is the correct format for the blockchain interface
                gas: 21000,  // Standard gas limit for ETH transfers, adjust based on transaction complexity
                gasPrice: await this.blockchainInterface.web3.eth.getGasPrice()  // Fetch current gas price
            };

            // Send the transaction to the blockchain
            const txResult = await this.blockchainInterface.sendTransaction(transaction);

            return {
                success: true,
                transactionId: txResult.transactionHash,  // Assuming sendTransaction resolves with a result containing the transactionHash
                message: "Payment processed successfully"
            };
        } catch (error) {
            console.error("Payment processing failed:", error);
            return { success: false, error: error.message };
        }
    }
}
