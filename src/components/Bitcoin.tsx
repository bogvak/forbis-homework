import React, { useEffect, useState } from "react";
import useInterval from '@use-it/interval';
import { getCurrencyFromApi } from "src/service/bitcoin.api";
import { CurrencyObj } from "src/interfaces/Bitcoin.interface";
import { SortMode } from "src/interfaces/SortMode.interface";
import { sortRates } from "src/utils/sortRates";

const statusMessages = {
    "-1": "not available",
    "0": "not fetched yet",
    "1": "succesful"
}

const fieldDescription = {
    "code": "Currency",
    "rate": "Rate"
}

const arrows = {
    "asc": <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-512.png" alt=""/>,
    "desc": <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-512.png" alt=""/>,
}

const Bitcoin: React.FC = () => {

    const [rates, setRates] = useState<CurrencyObj[]>([]);
    const [lastUp, setLastUp] = useState<string>("");
    const [lastFetch, setLastFetch] = useState<Date | undefined>(undefined);
    const [fetchStatus, setFetchStatus] = useState<number>(0);
    const [sortMode, setSortMode] = useState<SortMode>({ field: "code", direction: "asc" });

    async function fetchData() {
        try {
            const data = await getCurrencyFromApi();
            const ratesList: CurrencyObj[] = Object.keys(data.bpi).map(curr => {
                return data.bpi[curr];
            });
            setRates(sortRates(ratesList, sortMode));
            setLastUp(data.time.updateduk);
            setFetchStatus(1);
        } catch (error) {
            setFetchStatus(-1);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Sort mode");
        console.log(sortMode);
        console.log(sortRates(rates, sortMode));
        setRates(sortRates(rates, sortMode));
    }, [sortMode]);

    useInterval(() => {
        console.log("Updating...");
        fetchData();
    }, 15000);

    const switchSortDirection = () => {
        return sortMode.direction === "asc" ? "desc" : "asc";
    }

    const sortHandler = (event: React.MouseEvent<any>) => {
        event.preventDefault;
        const sortField = event.target.attributes["bt-field"].value;
        const sortDirection = sortMode.field === sortField ? switchSortDirection() : "asc";
        setSortMode({field: sortField, direction: sortDirection});
    }

    return (
        <>
            <table className="w-full text-md bg-white shadow-md rounded mb-4 bitcoin-table">
                <thead>
                    <tr className="border-b">
                        {['code', 'rate'].map(header =>
                            <th className="text-left p-3 px-5">
                                <a 
                                className="bitcoin-table-header"
                                bt-field={header}
                                onClick={sortHandler}
                                >
                                    {fieldDescription[header]}
                                    <div className="sort-arrow">
                                        {sortMode.field === header ? arrows[sortMode.direction]: ""}
                                    </div> 
                                </a>
                            </th>)}
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
