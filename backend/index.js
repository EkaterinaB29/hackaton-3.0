const express = require('express');
const bodyParser = require('body-parser');
const { Transaction, ec } = require('./transaction');

const app = express();
app.use(bodyParser.json());

app.post('/transaction/sign', (req, res) => {
    const { fromAddress, toAddress, amount, privateKey } = req.body;
    const key = ec.keyFromPrivate(privateKey);
    const transaction = new Transaction(fromAddress, toAddress, amount);
    transaction.signTransaction(key);
    res.json({ result: 'Transaction signed', transaction });
});

app.post('/transaction/verify', (req, res) => {
    const { transaction } = req.body;
    const trans = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount);
    trans.signature = transaction.signature;
    const isValid = trans.isValid();
    res.json({ result: 'Transaction verification', isValid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
