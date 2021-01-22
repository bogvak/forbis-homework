import { sortRates } from "./sortRates";
import { CurrencyObj } from "src/interfaces/Bitcoin.interface";

const currencyData: CurrencyObj[] = [
  {
    "code": "USD",
    "symbol": "$",
    "rate": "36,227.6475",
    "description": "United States Dollar",
    "rate_float": 36227.6475,
  },
  {
    "code": "GBP",
    "symbol": "£",
    "rate": "26,687.7848",
    "description": "British Pound Sterling",
    "rate_float": 26687.7848,
  },
  {
    "code": "EUR",
    "symbol": "€",
    "rate": "30,002.6870",
    "description": "Euro",
    "rate_float": 30002.687,
  },
];

const currencyDataSameCodes: CurrencyObj[] = [
  {
    "code": "USD",
    "symbol": "$",
    "rate": "36,227.6475",
    "description": "United States Dollar",
    "rate_float": 36227.6475,
  },
  {
    "code": "USD",
    "symbol": "$",
    "rate": "36,227.6475",
    "description": "United States Dollar",
    "rate_float": 36227.6475,
  },
];

describe("sortRate testing", () => {
  test("sorting by code", () => {
    const sortedRates = sortRates(
      currencyData,
      { field: "code", direction: "asc" },
    );
    expect(sortedRates[0]["code"]).toBe("EUR");
  });

  test("sorting by rate", () => {
    const sortedRates = sortRates(
      currencyData,
      { field: "rate", direction: "asc" },
    );
    expect(sortedRates[0]["code"]).toBe("GBP");
  });

  test("sorting by code, desc", () => {
    const sortedRates = sortRates(
      currencyData,
      { field: "code", direction: "desc" },
    );
    expect(sortedRates[0]["code"]).toBe("USD");
  });

  test("sorting by unsupported sort mode", () => {
    const sortedRates = sortRates(
      currencyData,
      { field: "symbol", direction: "desc" },
    );
    expect(sortedRates[0]["code"]).toBe("USD");
  });

  test("sorting : default branch in string comparision", () => {
    const sortedRates = sortRates(
      currencyDataSameCodes,
      { field: "code", direction: "desc" },
    );
    expect(sortedRates[0]["code"]).toBe("USD");
  });
});
