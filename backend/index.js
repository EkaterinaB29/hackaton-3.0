// const BlockchainInterface = require('./blockchain/blockchainInterface');
// const ExchangeService = require('./services/exchangeService');
// const PaymentProcessor = require('./services/paymentProcessor');
// const WalletDB = require('./database/walletDB'); // You need to implement this based on your DB schema
const ApiClient = require('./api/apiClient');
const Web3 = require('web3');
const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');



// Initialize Web3 connection (assuming Ethereum's mainnet for demonstration)
// const web3Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Initialize all components
const apiClient = new ApiClient('https://api.example.com');
// const blockchainInterface = new BlockchainInterface(web3Provider);
// const exchangeService = new ExchangeService(apiClient);
// const walletDB = new WalletDB(); // Make sure to implement methods such as getWallet

// Create the Payment Processor
// const paymentProcessor = new PaymentProcessor(blockchainInterface, exchangeService, walletDB);

const connection = mysql2.createConnection({ // RETRIEVE YOUR DATABASE CREDENTIALS
    host: '88.200.64.122',
    user: 'hackaton',
    password: 'pepe',
    database: 'hackaton'
});
connection.connect(err => {
    if (err) throw err;
    console.log("Connected to the database successfully!");
});

app.use(express.json()); // Middleware to parse JSON bodies

// Middleware to attach db connection to the request
app.use((req, res, next) => {
    req.db = connection;
    next();
  });
  app.use(cors());  

const PORT = process.env.PORT || 6500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api', require('./routes/userRoute'));

// Example usage: Process a payment
// (async () => {
//     try {
//         const fromAddress = '0x123...'; // Customer's address
//         const toAddress = '0xabc...'; // Merchant's address
//         const amount = 1; // Amount in Ether
//         const crypto = 'ETH';
//         const fiat = 'USD';

//         const result = await paymentProcessor.processPayment(fromAddress, toAddress, amount, crypto, fiat);
//         console.log("Payment processed:", result);
//     } catch (error) {
//         console.error("Error processing payment:", error);
//     }
// })();
/*app.post('/submit-transaction', async (req, res) => {
    try {
      const { signedTransaction, crypto, fiat } = req.body;
      const result = await paymentProcessor.processPayment(signedTransaction, crypto, fiat);
      res.send({
        message: 'Transaction processed successfully',
        data: result
      });
    } catch (error) {
      console.error('Error processing transaction:', error);
      res.status(500).send({
        message: 'Failed to process the transaction',
        error: error.toString()
      });
    }
  });
  */


