import React, { useEffect, useState } from "react";
import { fetchURLAsString } from "src/service/analyses.api"
import { parseToJson, getDocStatistics } from "src/utils/domParser"

const Analyses: React.FC = () => {
    async function fetchData() {
        try {
            // const data = await fetchURLAsString("avalanchelabs.com");
            const data = await fetchURLAsString("korrespondent.net");
            const doc = parseToJson(data);
            getDocStatistics(doc)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h1>Analyses</h1>
        </>
    );
};

export default Analyses;
