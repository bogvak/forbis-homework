import React, { useEffect, useState, useRef } from "react";
import { fetchURLAsString } from "src/service/analyses.api";
import { parseXML, getDocStatistics } from "src/utils/domParser";
import { LoadingState } from "src/interfaces/Analyses.types";
import { useSelector, useDispatch } from 'react-redux'
import AnalysesResult from "./AnalysesResult";

const Analyses: React.FC = () => {
    const [data, setData] = useState<Record<string, unknown> | undefined>(undefined);
    const [ldState, setLdState] = useState<LoadingState>(LoadingState.Idle);
    const urlForm = useRef();  

    const analysesData = useSelector(state => state.root.analysesData);
    const dispatch = useDispatch()
    const setAnalysesData = (aData:Record<string, unknown>): void => {
        dispatch({type: 'STORE_ANALYSES', payload: aData});
    }

    async function fetchData(url: string) {
        try {
            const fetchedData = await fetchURLAsString(url);
            const doc = parseXML(fetchedData);
            const stats = getDocStatistics(doc);
            setAnalysesData({
                data: stats,
                ldState: LoadingState.Loaded,
                url: url
            });
        } catch (error) {
            setAnalysesData({
                data: undefined,
                ldState: LoadingState.Error,
                url: url
            });
            throw new Error(error);
        }
    }

    useEffect(() => {
        if (data != undefined) setLdState(LoadingState.Loaded);
    }, [data])

    const getResultContainer = () => {
        switch (analysesData.ldState) {
            case LoadingState.Idle:
                return "Please enter your request";
            case LoadingState.Loading:
                return "Loading...";
            case LoadingState.Error:
                return "Error retrieving file, please check your URL";
            case LoadingState.Empty:
                return "The URL field is empty, please enter some URL";
            default:
                return <AnalysesResult stats={analysesData.data} />
        }
    }

    const loadUrl = (event: React.FormEvent) => {
        event.preventDefault();
        if (!urlForm.current.value) {
            setAnalysesData({
                data: undefined,
                ldState: LoadingState.Empty,
                url: ""
            });
            return;
        }
        setAnalysesData({
            data: undefined,
            ldState: LoadingState.Loading,
            url: ""
        });
        fetchData(urlForm.current.value);
    }

    return (
        <>
            <div>
                <form className="w-6/12 flex" onSubmit={loadUrl}>
                    <input ref={urlForm} className="flex-grow p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="URL to XML or HTML" defaultValue={analysesData.url} />
                    <button className="p-2 px-8 bg-yellow-400 text-gray-800 font-bold uppercase border-yellow-500 border-t border-b border-r">Analyse</button>
                </form>
            </div>
            {getResultContainer()}
        </>
    );
};

export default Analyses;
