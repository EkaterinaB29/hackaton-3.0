class ExchangeService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async convertToCurrency(amount, crypto, fiat) {
        const rate = await this.apiClient.getRate(crypto, fiat);
        return amount * rate;
    }
}
