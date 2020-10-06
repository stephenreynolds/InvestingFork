import { Injectable } from '@angular/core';
// @ts-ignore
const finnhub = require('finnhub');

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  private readonly apiKey: { apiKey: string; };
  private readonly client;

  public symbols: {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
    currency: string;
  }[];

  public profile = {
    country: '',
    currency: '',
    exchange: '',
    ipo: '',
    marketCapitalization: 0,
    name: '',
    phone: '',
    shareOutstanding: 0,
    ticker: '',
    weburl: '',
    logo: '',
    finnhubIndustry: ''
  };

  public constructor() {
    this.apiKey = finnhub.ApiClient.instance.authentications['api_key'];
    this.apiKey.apiKey = 'btt5puv48v6q0kg1m610';
    this.client = new finnhub.DefaultApi();
  }

  public getStockSymbols(exchange: string) {
    this.client.stockSymbols(exchange, (error, data, response) => {
      this.symbols = data;
    });
  }

  public getCompanyProfile2(symbol: string) {
    this.client.companyProfile2({'symbol': symbol}, (error, data, response) => {
      this.profile = data;
    });
  }
}
