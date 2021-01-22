import React, { useEffect, useState } from "react";
import useInterval from '@use-it/interval';
import { getCurrencyFromApi } from "src/service/bitcoin.api";
import { CurrencyObj, DisplayData } from "src/interfaces/Bitcoin.interface";
import { SortMode } from "src/interfaces/SortMode.interface";
import { sortRates } from "src/utils/sortRates";
import { useSelector, useDispatch } from 'react-redux'

const statusMessages = {
    "-1": ["not available", "bt-mes-error"],
    "0": ["not fetched yet", "bt-mes-normal"],
    "1": ["succesful", "bt-mes-success"]
}

const fieldDescription = {
    "code": "Currency",
    "rate": "Rate"
}

const arrows = {
    "asc": <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-512.png" alt="" />,
    "desc": <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-512.png" alt="" />,
}

const Bitcoin: React.FC = () => {

    const [displayData, setDisplayData] = useState<DisplayData>({
        rates: [],
        lastUp: "",
        lastFetch: undefined,
        fetchStatus: 0
    });

    const setPartialDisplayData = (rec: Record<string, unknown>): void => {
        setDisplayData({...displayData, ...rec});
    }

    const sortMode = useSelector(state => state.root.sortMode);
    const dispatch = useDispatch()
    const setSortMode = (sm: SortMode): void => {
        dispatch({ type: 'STORE_SORTMODE', payload: sm });
    }

    async function fetchData() {
        try {
            const data = await getCurrencyFromApi();
            const ratesList: CurrencyObj[] = Object.keys(data.bpi).map(curr => {
                return data.bpi[curr];
            });
            setPartialDisplayData({
                rates: sortRates(ratesList, sortMode),
                lastUp: data.time.updateduk,
                lastFetch: new Date(),
                fetchStatus: 1
            })
        } catch (error) {
            setPartialDisplayData({
                fetchStatus: -1
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setPartialDisplayData({
            rates: sortRates(displayData.rates, sortMode)
        })
    }, [sortMode]);

    useInterval(() => {
        fetchData();
    }, 15000);

    const switchSortDirection = () => {
        return sortMode.direction === "asc" ? "desc" : "asc";
    }

    const sortHandler = (event: React.MouseEvent<any>) => {
        event.preventDefault;
        const sortField = event.target.attributes["bt-field"].value;
        const sortDirection = sortMode.field === sortField ? switchSortDirection() : "asc";
        setSortMode({ field: sortField, direction: sortDirection });
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
                                        {sortMode.field === header ? arrows[sortMode.direction] : ""}
                                    </div>
                                </a>
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {displayData.rates.map(curr => {
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
            <div>Last rate update at: {displayData.lastUp}</div>
            <div>Last fetch at: {String(displayData.lastFetch)}, status: <span className={`bt-mes ${statusMessages[displayData.fetchStatus][1]}`}>{statusMessages[displayData.fetchStatus][0]}</span></div>
        </>
    );
};

export default Bitcoin;
