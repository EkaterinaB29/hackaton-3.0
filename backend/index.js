// const ExchangeService = require('./services/exchangeService');
// const PaymentProcessor = require('./services/paymentProcessor');
const ApiClient = require('./api/apiClient');
const Web3 = require('web3');
const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');
const { User } = require('./user/User');  // Adjust the path as necessary
const BlockchainInterface = require('./transactions/blockchainInterface');
const blockchainInterface = new BlockchainInterface('https://mainnet.infura.io/v3/7f7336b604014a63a4fe74c89f2d8cd5');

const web3 = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7f7336b604014a63a4fe74c89f2d8cd5');

// Initialize all components
const apiClient = new ApiClient('https://api.example.com');

// const paymentProcessor = new PaymentProcessor(blockchainInterface, exchangeService);

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


  app.post('/check-wallet', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const walletExists = await blockchainInterface.checkTransactionPossible(user.publicKey, 'dummy_to_address', '0');
        if (walletExists) {
            res.send({ message: "Wallet is active and has sufficient balance" });
        } else {
            res.status(400).send({ error: "Wallet does not have sufficient balance or does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

  app.post('/transaction', async (req, res) => {
    const { email, toAddress, amount } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const fromAddress = user.walletAddress;
        // Assume processPayment is a function you've defined to handle the payment logic
        const paymentResult = await processPayment(fromAddress, toAddress, amount);

        if (paymentResult.success) {
            res.status(201).send({
                message: 'Transaction successful',
                transactionId: paymentResult.transactionId
            });
        } else {
            res.status(400).send('Transaction failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
// Test Web3 functionality
console.log(web3.version);
web3.eth.getBlockNumber().then(console.log);
web3.eth.getBalance('0x123...').then(console.log);  // Replace '0x123...' with a real address
web3.eth.getTransactionCount('0x123...').then(console.log);
web3.eth.getGasPrice().then(console.log);
web3.eth.getChainId().then(console.log);
web3.eth.net.getId().then(console.log);



const PORT = process.env.PORT || 6500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api', require('./routes/userRoute'));
console.log(User); // Check what is imported
User.findByEmail(connection, 'hackaton@gmail.com').then(user => {
    console.log(user);
}).catch(err => {
    console.error(err);
});

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


