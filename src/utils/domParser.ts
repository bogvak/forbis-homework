import { TagsTableData } from "src/interfaces/Analyses.types";

const tagsToIgnore = ["#text", "#comment"];

/**
 * Extracting provided XML or HTML to Document object.
 */
export const parseXML = (xml: string): Document => {
    const parser = new DOMParser();
    const docError = parser.parseFromString('INVALID', 'text/xml');
    const parsererrorNS = docError.getElementsByTagName("parsererror")[0].namespaceURI;
    const doc = parser.parseFromString(xml, "text/xml");
    if (doc.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
        return parser.parseFromString(xml, "text/html");
    }
    return doc;
};

export const getDocStatistics = (doc: Document): Record<string, unknown> => {
    const root = doc.documentElement;
    const path = [root.nodeName]
    const resDict = {};
    resDict[root.nodeName] = { counter: 1, pathes: [] };
    resDict[root.nodeName].pathes.push(path);
    iterateChildrens(root.childNodes, resDict, path);
    return resDict;
};

export const getTableData = (stats: Record<string, unknown>): Array<TagsTableData> => {
    const sortedTags: TagsTableData[] = Object.keys(stats).map((tag: string) => {
        return [tag, stats[tag]["counter"]];
    });
    sortedTags.sort(
        (tag_data1: TagsTableData, tag_data2: TagsTableData) => tag_data2[1] - tag_data1[1]
    );
    return sortedTags;
};

export const getMostPopularTag = (tagsData: Array<TagsTableData>): TagsTableData => {
    return tagsData.reduce((most_pop_tag: TagsTableData, next_tag: TagsTableData) => {
        if (most_pop_tag === undefined) {
            return tagsToIgnore.includes(next_tag[0]) ? undefined : next_tag;
        }
        if (tagsToIgnore.includes(next_tag[0])) return most_pop_tag;
        return next_tag[1] > most_pop_tag[1] ? next_tag : most_pop_tag;
    }, undefined);
};

export const getLongestPath = (tagToSearch: string, pathesDict: Record<string, unknown>): string[] => {
    let longestPath = [];
    let currNumberOfTags = 0;
    Object.keys(pathesDict).map((tagName: string) => {
        pathesDict[tagName]["pathes"].map((next_path: string[]) => {
            const numbOfTagsInPath = countIncludes(tagToSearch, next_path);
            if (numbOfTagsInPath > currNumberOfTags) {
                currNumberOfTags = numbOfTagsInPath;
                longestPath = next_path;
            }
        })
    })
    return longestPath;
}

const iterateChildrens = (
    childs: NodeListOf<ChildNode>,
    resDict: Record<string, unknown>,
    path: string[]): void => {
    childs.forEach((child) => {
        const name = child.nodeName;
        path.push(name);
        if (name in resDict) {
            resDict[name].counter += 1;
        } else resDict[name] = { counter: 1, pathes: [] };
        resDict[name].pathes.push([...path]);
        iterateChildrens(child.childNodes, resDict, path);
        path.pop();
    });
};

const countIncludes = (tagToCount: string, arrayToSearch: string[]): number => {
    let counter = 0;
    arrayToSearch.map((next_string: string) => {
        if (next_string === tagToCount) ++counter;
    });
    return counter;
};