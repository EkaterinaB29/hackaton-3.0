const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

class PaymentProcessor {
    constructor(blockchainInterface, exchangeService, userDb) {
        this.blockchainInterface = blockchainInterface;
        this.exchangeService = exchangeService;
        this.userDb = userDb;  // Database access for user validation
    }

    async processPayment(token, toAddress, amount, crypto, fiat) {
        try {
            // Decode and verify the token
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await this.userDb.findByEmail(decoded.email);  // Assume email is part of the token payload

            if (!user) {
                throw new Error('User not found or invalid token');
            }

            // Retrieve user's wallet from database
            const wallet = await this.userDb.getWallet(user.id);

            // Create transaction
            const transaction = wallet.createTransaction(toAddress, amount);
            const txResult = await this.blockchainInterface.sendTransaction(transaction);

            // Handle currency conversion
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
