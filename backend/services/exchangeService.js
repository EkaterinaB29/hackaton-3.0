

class ExchangeService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async fetchExchangeRate(crypto, fiat) {
        const rate = await this.apiClient.getRate(crypto, fiat); // Assume apiClient handles API calls
        return rate;
    }

    async convertToCurrency(amount, crypto, fiat) {
        const rate = await this.fetchExchangeRate(crypto, fiat);
        return amount * rate;
    }
}
