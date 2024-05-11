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

const web3 = new Web3 (new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7f7336b604014a63a4fe74c89f2d8cd5'));
const jwt = require('jsonwebtoken');

require('dotenv').config(); // Make sure this is at the top of your main file
const SECRET_KEY = process.env.JWT_SECRET_KEY;

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

  


  app.get('/verify-wallet/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const walletAddress = user.wallet_id;
        const balance = await web3.eth.getBalance(walletAddress);

        if (web3.utils.toBN(balance).isZero()) {
            res.send({ status: 'inactive', message: "This wallet has no balance" });
        } else {
            res.send({ status: 'active', message: "This wallet is active with a balance" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});
app.get('/verify-token', (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send('Token not provided');
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(500).send('Token verification failed');
        }

        res.send(decoded);
    });
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

web3.eth.net.isListening()
    .then(() => console.log('Successfully connected to the Ethereum network'))
    .catch(e => console.error('Something went wrong connecting to the Ethereum network:', e));




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

// Signing a JWT
const user = { id: 1, username: 'testuser' };
const secretKey = 'your_secret_key';

const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

console.log(token);

// Verifying a JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT verification failed:', err);
  } else {
    console.log('Decoded JWT:', decoded);
  }
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


