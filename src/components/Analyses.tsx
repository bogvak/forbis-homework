import React, { useEffect, useState } from "react";
import { fetchURLAsString } from "src/service/analyses.api"
import { parseToJson, getDocStatistics, getTableData, getMostPopularTag, getLongestPath } from "src/utils/domParser"
import { TagsTableData } from "src/interfaces/Analyses.types"

enum LoadingState {
    Idle,
    Loading,
    Loaded,
}

const Analyses: React.FC = () => {
    const [tableData, setTableData] = useState<TagsTableData[] | undefined>(undefined);
    const [mostPopularTag, setMostPopularTag] = useState<TagsTableData>(undefined);
    const [longestPath, setLongestPath] = useState<string[]>([]);


    async function fetchData() {
        try {
            // const data = await fetchURLAsString("avalanchelabs.com");
            const data = await fetchURLAsString("korrespondent.net");
            const doc = parseToJson(data);
            const stats = getDocStatistics(doc);
            const tableData = getTableData(stats);
            const mostPopular = getMostPopularTag(tableData);
            const longestPath = getLongestPath(mostPopular[0], stats);
            setTableData(tableData);
            setMostPopularTag(mostPopular);
            setLongestPath(longestPath);
            console.log(mostPopular);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div>Please note that currently pure text and comments nodes are ignored.</div>
            <div>The most popular tag: {mostPopularTag != undefined ? mostPopularTag[0] : ""},
                 it's used {mostPopularTag != undefined ? mostPopularTag[1] : ""} times;
            </div>
            <div>The longest path is: {longestPath.join("->")}.</div>
            <div className="cont-scrollable bg-white shadow-md rounded">
                <table className="w-full text-md mb-4">
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
};

export default Analyses;
