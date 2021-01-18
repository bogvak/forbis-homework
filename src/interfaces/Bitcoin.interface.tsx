export interface Bitcoin {
    time: Time;
    disclaimer: string;
    chartName: string;
    bpi: Bpi;
}

export interface Time {
    updated: Date;
    updatedISO: Date;
    updateduk: string;
}

export interface Bpi {
    USD: CurrencyObj;
    GBP: CurrencyObj;
    EUR: CurrencyObj;
}

export interface CurrencyObj {
    code: string;
    symbol: string;
    rate: string;
    description: string;
    rate_float: number;
}
