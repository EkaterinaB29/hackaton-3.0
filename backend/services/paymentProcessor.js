class PaymentProcessor {
    constructor(blockchainInterface, exchangeService, walletDB) {
        this.blockchainInterface = blockchainInterface;
        this.exchangeService = exchangeService;
        this.walletDB = walletDB; // Database access layer for storing/retrieving wallet addresses
    }

    async processPayment(fromAddress, toAddress, amount, crypto, fiat) {
        try {
            const senderWallet = this.walletDB.getWallet(fromAddress); // Retrieve sender's wallet details from DB
            const transaction = senderWallet.createTransaction(toAddress, amount);
            const txResult = await this.blockchainInterface.sendTransaction(transaction);
            const convertedAmount = await this.exchangeService.convertToCurrency(amount, crypto, fiat);
            
            return {
                transaction: txResult,
                convertedAmount: convertedAmount
            };
        } catch (error) {
            console.error("Payment processing failed:", error);
            throw error;
        }
    }
}
