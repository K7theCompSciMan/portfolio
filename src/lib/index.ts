import fs from 'vite-plugin-fs/browser';
import { getXataClient, type Data as XataData } from './xata';
import { configDotenv } from 'dotenv';
export type Data = {
	homePage?: {
		headline?: {
			imgURL?: string;
			content?: string;
			name?: string;
			location?: string;
			tagline?: string[];
		};
		projects?: ProjectPreview[];
	};
	aboutPage?: {};
	projectsPage?: {
		engineeringProjects?: Project[];
		programmingProjects?: Project[];
	};
};
export type Image = {
	imgURL?: string;
	alt?: string;
	onclick?: () => void;
	caption?: string;
	class?: string;
	css?: string;
};


export type SubHeading = {
	images?: Image[];
	title?: string;
	content?: string;
	html?: boolean;
	subheadings?: SubHeading[];
	showSubHeadings?: boolean;
	border?: boolean;
};
export type Description = {
	overview?: string;
	subheadings?: SubHeading[];
};
export type Project = {
	name?: string;
	date?: string;
	category?: string;
	technologies?: Technology[];
	description?: Description;
	image?: string;
	url?: string;
};
export type ProjectPreview = {
	name?: string;
	date?: string;
	category?: string;
	technologies?: Technology[];
};
export type Technology = {
	name: string;
	url: string;
	logo?: string;
};
export const getData = async (): Promise<Data> =>{ 
	return (await fetch("https://k7-portfolio.fly.dev/data")).json();

}
export const setData = async (newData: Data) => {
	console.log(await (await fetch("https://k7-portfolio.fly.dev/data", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newData),
	})).json())
};

