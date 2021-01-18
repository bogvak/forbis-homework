import React, { useEffect, useState } from "react";
import useInterval from '@use-it/interval';
import { getCurrencyFromApi } from "src/service/bitcoin.api";
import { CurrencyObj } from "src/interfaces/Bitcoin.interface";

const statusMessages = {
    "-1": "not available",
    "0": "not fetched yet",
    "1": "succesful"
}

const Bitcoin: React.FC = () => {
    
    const [rates, setRates] = useState<CurrencyObj[]>([]);
    const [lastUp, setLastUp] = useState<string>("");
    const [lastFetch, setLastFetch] = useState<Date|undefined>(undefined);
    const [fetchStatus, setFetchStatus] = useState<number>(0);
    
    async function fetchData() {
        try {
            const data = await getCurrencyFromApi();
            const ratesList: CurrencyObj[] = Object.keys(data.bpi).map(curr => {
                return data.bpi[curr];
            });
            setRates(ratesList);
            setLastUp(data.time.updateduk);
            setFetchStatus(1);
            console.log(rates);
        } catch (error) {
            console.log(error);
            setFetchStatus(-1);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useInterval(() => {
        console.log("Updating...");
        fetchData();
      }, 15000);

    console.log(rates);

    return (
        <>
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <thead>
                    <tr className="border-b">
                        {['Currency', 'Rate'].map(header => <th className="text-left p-3 px-5">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rates.map(curr => {
                        return (
                            <tr className="border-b hover:bg-orange-100 bg-gray-100">
                                <td className="p-3 px-5">
                                    {curr.code}
                                </td>
                                <td className="p-3 px-5">
                                    {curr.rate}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>Last rate update at: {lastUp}</div>
            <div>Last fetch at: {lastFetch}, status: {statusMessages[fetchStatus]}</div>
        </>
    );
};

export default Bitcoin;
