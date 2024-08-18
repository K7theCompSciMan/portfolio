import fs from 'vite-plugin-fs/browser'
export type Data = {
    homePage?: {
        headline?: {
            imgURL?: string 
            content?: string 
            name?: string
            location?: string
            tagline?: string[] 
        }
    }
    aboutPage?: {

    }
    projectsPage?: {

    }
}
export const getData = async(): Promise<Data> => JSON.parse(await fs.readFile('./data.json')).data;

export const setData = async (newData: Data) => {
    fs.writeFile('./data.json', JSON.stringify({ data: newData }));
    console.log("saved", await fs.readFile('./data.json'));
};