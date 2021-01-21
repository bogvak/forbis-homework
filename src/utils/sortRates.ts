import { CurrencyObj } from "src/interfaces/Bitcoin.interface";
import { SortMode } from "src/interfaces/SortMode.interface";

const directionMultiplier = {
    "asc": 1,
    "desc": -1
}

const compareString = (a: string, b: string): number => {
    var capsA = a.toUpperCase();
    var capsB = b.toUpperCase();
    switch (true) {
        case capsA < capsB:
            return -1;
        case capsA > capsB:
            return 1;
        default:
            return 0;
    }
}

const compareNumber = (a: number, b: number): number => {
    return a - b;
}

export const sortRates = (rates: CurrencyObj[], sortMode: SortMode): CurrencyObj[] => {
    switch (sortMode.field) {
        case "code":
            rates.sort((a: CurrencyObj, b: CurrencyObj) =>
                directionMultiplier[sortMode.direction] * compareString(a.code, b.code))
            break;
        case "rate":
            rates.sort((a: CurrencyObj, b: CurrencyObj) =>
                directionMultiplier[sortMode.direction] * compareNumber(a.rate_float, b.rate_float));
            break;
        default:
            break;
    }
    return [...rates];
}