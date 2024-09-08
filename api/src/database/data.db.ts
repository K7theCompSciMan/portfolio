import { configDotenv } from "dotenv";
import { getXataClient, type Data as XataData } from "../xata";

configDotenv();
const xata = getXataClient();

export const getData = async () => {
	return (await xata.db.data.getAll()).filter((d) => d.name === "Kesavan R")[0].data
}

export const setData = async (data: any) => {
	return await xata.db.data.update({ data, name: "Kesavan R", id: "rec_crf29ivdefbkv78rtpeg" } as XataData)
}