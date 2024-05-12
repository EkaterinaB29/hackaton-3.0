const axios = require('axios');
const cheerio = require('cheerio');

async function fetchETHRate() {
        try {
            const url = 'https://www.coingecko.com/en/coins/ethereum'; // Example URL, replace with your target
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const rateText = $('.exchange-rate-price').text(); // Replace with the actual selector for the ETH rate
            const rate = parseFloat(rateText.replace(/[^\d.-]/g, ''));
            return rate;
        } catch (error) {
            console.error('Failed to fetch ETH rate:', error);
            throw error;
        }
    }

    ApiClient = fetchETHRate().then(rate => console.log(`Current ETH/EUR rate: €${rate}`));

module.exports = ApiClient;