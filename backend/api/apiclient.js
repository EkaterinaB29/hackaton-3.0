const axios = require('axios');

class ApiClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL
        });
    }

    async getRate(crypto, fiat) {
        try {
            const response = await this.client.get(`/exchange-rate/${crypto}/${fiat}`);
            return response.data.rate; // Assuming the API returns an object with a 'rate' key
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
            throw error;
        }
    }
}

module.exports = ApiClient;
