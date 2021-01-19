export const fetchURLAsString = async (url: string): Promise<string> => {
    // const response = await fetch("https://www.forbis.eu/");
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const body = await response.text();
    return body;
}