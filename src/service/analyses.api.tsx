export const fetchURLAsString = async (url: string): Promise<string> => {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
        if (response.status != 200) throw 'Invalid request';
        const body = await response.text();
        return body;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}