import parseXml from '@rgrove/parse-xml';

export const parseToJson = (xml: string): any => {
    const parser = new DOMParser();
    const docError = parser.parseFromString('INVALID', 'text/xml');
    const parsererrorNS = docError.getElementsByTagName("parsererror")[0].namespaceURI;
    const doc = parser.parseFromString(xml, "text/xml");
    if (doc.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
        return parser.parseFromString(xml, "text/html");
    }
    return doc;
}

export const getDocStatistics = (doc: Document): any => {
    console.log("Statistics");
    const root = doc.documentElement;
    let path = [root.nodeName]
    let resDict = {}; resDict[root.nodeName] = { counter: 1, pathes: [] };
    resDict[root.nodeName].pathes.push(path);
    iterateChildrens(root.childNodes, resDict, path);
    console.log(resDict);
}

const iterateChildrens = (childs: NodeListOf<ChildNode>, resDict: object, path: string[]): any => {
    childs.forEach((child) => {
        const name = child.nodeName;
        path.push(name);
        if (name in resDict) { resDict[name].counter += 1; }
        else resDict[name] = { counter: 1, pathes: [] };
        resDict[name].pathes.push([...path]);
        iterateChildrens(child.childNodes, resDict, path);
        path.pop();
    })
}