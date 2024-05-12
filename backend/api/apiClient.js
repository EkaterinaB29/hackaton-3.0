const axios = require('axios');

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.coingecko.com/api/v3'
        });
    }

    async getRate(crypto, fiat) {
        try {
            const response = await this.client.get(`/simple/price?ids=${crypto}&vs_currencies=${fiat}`);
            if (response.data[crypto] && response.data[crypto][fiat]) {
                return response.data[crypto][fiat];
            } else {
                throw new Error('No rate found');
            }
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
            throw error;
        }
    }
}

module.exports = ApiClient;