import React from "react";
import { getTableData, getMostPopularTag, getLongestPath } from "src/utils/domParser";

const AnalysesResult: React.FC = ({ stats }) => {

    const tableData = getTableData(stats);
    const mostPopularTag = getMostPopularTag(tableData);
    const longestPath = getLongestPath(mostPopularTag[0], stats);

    return (
        <>
            <div className="analyses-res-container">
                <div>Please note that currently pure text and comments nodes are ignored.</div>
                <div>The most popular tag: {mostPopularTag != undefined ? mostPopularTag[0] : ""},
                     it's used {mostPopularTag != undefined ? mostPopularTag[1] : ""} times;
                </div>
                <div>The longest path is: <br />{longestPath.join("->")}.</div>
            </div>
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

export default AnalysesResult;