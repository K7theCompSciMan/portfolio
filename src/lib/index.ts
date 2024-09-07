import fs from 'vite-plugin-fs/browser';
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
export const getData = async (): Promise<Data> => JSON.parse(await fs.readFile('./data.json')).data;

export const setData = async (newData: Data) => {
	fs.writeFile('./data.json', JSON.stringify({ data: newData }));
	console.log('saved', await fs.readFile('./data.json'));
};
