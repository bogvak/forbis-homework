import {Bitcoin, Bpi, Time, CurrencyObj} from "src/interfaces/Bitcoin.interface"

export const getCurrencyFromApi = async (): Promise<Bitcoin> => {
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const body = await response.json();
    return body;
}