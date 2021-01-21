import { table } from "console";
import {
  parseXML,
  getDocStatistics,
  getTableData,
  getMostPopularTag,
  getLongestPath,
} from "./domParser";

const testXML = `
<note>
    <to>Tove</to>
    <to>Bogv</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>
`;

const testHtml = `
<!doctype html>
<html>
  <head>
    <title>Test HTML snippet</title>
  </head>
  <body>
    <p>Paragraph <strong>strong</strong></p>
    <p>Paragraph 2<strong>strong</strong></p>
  </body>
</html>
`;

const testGetTableData = (doc: Document): [string, number][] => {
  const stats = getDocStatistics(doc);
  return getTableData(stats);
};

const testGetMostPopularTag = (doc: Document): [string, number] => {
  const tableData = testGetTableData(doc);
  return getMostPopularTag(tableData);
};

describe("ParseXML testing", () => {
  test("Parsing XML", () => {
    const doc = parseXML(testXML);
    expect(doc.documentElement.childNodes.length).toBe(11);
  });

  test("Parsing HTML", () => {
    const doc = parseXML(testHtml);
    expect(doc.doctype.name).toBe("html");
    expect(doc.documentElement.childNodes.length).toBe(3);
  });
});

describe("getDocStatistics testing", () => {
  test("HTML statistics", () => {
    const doc = parseXML(testHtml);
    const stats = getDocStatistics(doc);
    expect(Object.keys(stats).length).toBe(7);
    expect(Object.keys(stats)).toContain("HTML");
  });

  test("XML statistics", () => {
    const doc = parseXML(testXML);
    const stats = getDocStatistics(doc);
    expect(Object.keys(stats).length).toBe(6);
    expect(Object.keys(stats)).toContain("from");
  });
});

describe("getTableData testing", () => {
  test("HTML tableData", () => {
    const doc = parseXML(testHtml);
    const tableData = testGetTableData(doc);
    expect(tableData[0][0]).toBe("#text");
    expect(tableData[0][1]).toBe(11);
  });

  test("XML tableData", () => {
    const doc = parseXML(testXML);
    const tableData = testGetTableData(doc);
    expect(tableData[0][0]).toBe("#text");
    expect(tableData[0][1]).toBe(11);
  });
});

describe("getMostPopularTag testing", () => {

  test("HTML most popular tag", () => {
    const doc = parseXML(testHtml);
    const mostPopularTag = testGetMostPopularTag(doc);
    expect(mostPopularTag[0]).toBe("P");
    expect(mostPopularTag[1]).toBe(2);
  });

  test("XML most popular tag", () => {
    const doc = parseXML(testXML);
    const mostPopularTag = testGetMostPopularTag(doc);
    expect(mostPopularTag[0]).toBe("to");
    expect(mostPopularTag[1]).toBe(2);
  });
});

describe("getLongestPath testing", () => {
  test("HTML most popular tag", () => {
    const doc = parseXML(testHtml);
    const stats = getDocStatistics(doc);
    const longestPath = getLongestPath("P", stats);
    expect(longestPath.length).toBe(4);
  });
});
