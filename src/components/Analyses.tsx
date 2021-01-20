import React, { ReactPropTypes, useEffect, useState, useRef } from "react";
import { fetchURLAsString } from "src/service/analyses.api";
import { parseToJson, getDocStatistics, getTableData, getMostPopularTag, getLongestPath } from "src/utils/domParser";
import { TagsTableData } from "src/interfaces/Analyses.types";

enum LoadingState {
    Idle,
    Loading,
    Loaded,
    Error,
    Empty
};

const Analyses: React.FC = () => {
    const [data, setData] = useState<Record<string, unknown> | undefined>(undefined);
    const [ldState, setLdState] = useState<LoadingState>(LoadingState.Idle);
    const urlForm = useRef();

    async function fetchData(url: string) {
        try {
            const data = await fetchURLAsString(url);
            const doc = parseToJson(data);
            const stats = getDocStatistics(doc);
            setData(stats);
        } catch (error) {
            console.log("Wrong fetch")
            setLdState(LoadingState.Error);
            throw new Error(error);
        }
    }

    useEffect(() => {
        if (data != undefined) setLdState(LoadingState.Loaded);
    }, [data])

    const getResultContainer = () => {
        switch (ldState) {
            case LoadingState.Idle:
                return "Please enter your request";
            case LoadingState.Loading:
                return "Loading...";
            case LoadingState.Error:
                return "Error retrieving file, please check your URL";
            case LoadingState.Empty:
                return "The URL field is empty, please enter some URL";
            default:
                return <AnalysesResult stats={data} />
        }
    }

    const loadUrl = (event: React.FormEvent) => {
        event.preventDefault();
        if (!urlForm.current.value) {
            setLdState(LoadingState.Empty);
            return;
        }
        setLdState(LoadingState.Loading);
        fetchData(urlForm.current.value);
    }

    return (
        <>
            <div>
                <form className="w-6/12 flex" onSubmit={loadUrl}>
                    <input ref={urlForm} className="flex-grow p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="URL to XML or HTML" />
                    <button className="p-2 px-8 bg-yellow-400 text-gray-800 font-bold uppercase border-yellow-500 border-t border-b border-r">Analyse</button>
                </form>
            </div>
            {getResultContainer()}
        </>
    );
};

const AnalysesResult: React.FC = ({ stats }) => {

    const tableData = getTableData(stats);
    const mostPopularTag = getMostPopularTag(tableData);
    const longestPath = getLongestPath(mostPopularTag[0], stats);

    return (
        <>
            <div>Please note that currently pure text and comments nodes are ignored.</div>
            <div>The most popular tag: {mostPopularTag != undefined ? mostPopularTag[0] : ""},
                 it's used {mostPopularTag != undefined ? mostPopularTag[1] : ""} times;
            </div>
            <div>The longest path is: {longestPath.join("->")}.</div>
            <div className="cont-scrollable bg-white shadow-md rounded">
                <table className="text-md mb-4 analyses-table">
                    <thead>
                        <tr className="border-b">
                            {['tag name', 'number of inserts'].map(header =>
                                <th className="text-left p-3 px-5">
                                    <a
                                        className="bitcoin-table-header"
                                    >
                                        {header}
                                    </a>
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData != undefined ? tableData.map(tag => {
                            return (
                                <tr className="border-b hover:bg-orange-100 bg-gray-100 text-xs">
                                    <td className="p-2 px-5">{tag[0]}</td>
                                    <td className="p-2 px-5">{tag[1]}</td>
                                </tr>
                            )
                        }) : ""}
                    </tbody>
                </table>
            </div>
            <div></div>
            <div></div>
        </>
    );
}

export default Analyses;
