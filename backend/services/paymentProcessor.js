class PaymentProcessor {
    constructor(blockchainInterface, exchangeService) {
        this.blockchainInterface = blockchainInterface;
        this.exchangeService = exchangeService;
    }

    async processPayment(fromAddress, toAddress, amount, crypto, fiat) {
        try {
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
