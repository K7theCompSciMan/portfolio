<script lang="ts">
	import type { Description, Project, ProjectPreview, SubHeading, Technology } from '$lib/index';
	import AnimatedInputLabel from '$lib/AnimatedInputLabel.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import { getData, setData, type Data } from '$lib';
	import Tooltip from '$lib/Tooltip.svelte';
	import Image from '$lib/Image.svelte';

	export let actionData: ActionData;
	let loggedIn = false;
	if ($page.data.status == 401) {
		loggedIn = false;
	} else {
		loggedIn = true;
	}
	let username = '';
	let password = '';
	let peek = false;
	$: if (actionData && actionData.status == 200) {
		loggedIn = true;
	}

	let selectedPage = 'projects';
	let templateProjectPreview: ProjectPreview = {
		name: 'Project Name',
		date: '2024',
		category: 'project',
		technologies: [
			{ name: 'tech', url: '' },
			{ name: 'somethingnew', url: '' }
		]
	};
	let templateProject: Project = {
		name: 'Project Name',
		date: '2024',
		category: 'project',
		technologies: [
			{ name: 'tech', url: '' },
			{ name: 'somethingnew', url: '' }
		]
	};
	let data: Data = {
		homePage: {
			headline: {
				tagline: ['']
			},
			projects: [
				{
					name: 'test',
					date: '2024',
					category: 'project',
					technologies: [
						{ name: 'tech', url: '' },
						{ name: 'somethingnew', url: '' }
					]
				}
			]
		}
	};
	onMount(async () => {
		data = await getData();
	});
	$: console.log(data);
	const saveData = async () => {
		console.log('unsaved', data);
		await setData(data);
	};

	let newTechPopup = false;
	let technologies: Technology[] = [
		{
			name: 'Svelte',
			url: 'https://svelte.dev',
			logo: 'https://svelte.dev/svelte-logo.svg'
		},
		{
			name: 'TS',
			url: 'https://www.typescriptlang.org/',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png'
		},
		{
			name: 'Java',
			url: 'https://www.java.com/en/',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Java_Logo.svg/1200px-Java_Logo.svg.png'
		},
		{
			name: 'VEX Robotics',
			url: 'https://www.vexrobotics.com/',
			logo: 'https://kb.vex.com/hc/article_attachments/29769144398996'
		},
		{
			name: 'RobotC',
			url: 'https://www.robotc.net',
			logo: 'data:image/png;base64,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'
		}
	];
	let selectedProjectPreview: ProjectPreview;
	let descriptionPopup = false;
	let selectedProject: Project;
	let subsubheadingsPopup = false;
	let selectedSubHeading: SubHeading;
</script>

<div
	class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar flex flex-col fixed bg-slate-800 w-screen"
	id="scrollable"
>
	{#if !loggedIn}
		<div class="flex justify-center">
			<div class="flex flex-col w-1/2 left-1/4 justify-center">
				<AnimatedInputLabel
					name="Username"
					labelbg="bg-slate-800"
					bind:value={username}
					size="scale-110"
				></AnimatedInputLabel>
				<AnimatedInputLabel
					name="Password"
					type={peek ? 'text' : 'password'}
					labelbg="bg-slate-800"
					bind:value={password}
					size="scale-110"
				></AnimatedInputLabel>
				<button
					class="absolute right-[30%] top-[15.5%]"
					on:click={() => {
						if (!peek) peek = true;
						else peek = false;
					}}
				>
					{#if !peek}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					{/if}
				</button>
				<form use:enhance method="post">
					<input type="text" bind:value={username} class="hidden" name="username" />
					<input type="password" bind:value={password} class="hidden" name="password" />
					<button
						type="submit"
						class="border bg-transparent w-[75%] relative left-[12.5%] pl-4 pr-4 text-current rounded-md mt-[4%] scale-110 mt[6%]"
						>Log In</button
					>
				</form>
			</div>
		</div>
	{:else}
		<div class="flex flex-col justify-center">
			<h1 class="text-4xl text-center">Welcome, Admin</h1>
			<h1 class="text-2xl text-center">Enter Info Below</h1>
			<div
				class="w-3/4 h-[48rem] rounded-2xl border-slate-500 border-[1px] left-[12.5%] relative"
			>
				<div
					class="rounded-3xl border-[1px] border-slate-500 w-[25%] h-[5%] left-[37.5%] mt-[1%] relative flex-row flex align-middle justify-center items-center text-sm"
				>
					<Button name="Home" onclick={() => (selectedPage = 'home')} more="mr-4"
					></Button>
					<Button
						name="My Projects"
						onclick={() => (selectedPage = 'projects')}
						more="mr-4"
					></Button>
					<Button name="About Me" onclick={() => (selectedPage = 'about-me')}></Button>
				</div>
				<div>
					{#if selectedPage === 'home'}
						{#if data.homePage && data.homePage.headline && data.homePage.projects}
							<div
								id="headline"
								class="w-1/3 h-[16rem] rounded-2xl border-slate-500 border-[1px] ml-4 mt-2"
							>
								<h1 class="text-2xl">Headline</h1>
								<div class="overflow-auto h-[12rem] w-3/4">
									<div class="flex flex-row">
										<!-- svelte-ignore a11y-img-redundant-alt -->
										<img
											src={data.homePage.headline.imgURL}
											alt="Personal Image Preview"
											class="overflow-auto rounded-full text-sm w-16 h-16 mr-2"
										/>
										<AnimatedInputLabel
											name="Image URL"
											bind:value={data.homePage.headline.imgURL}
											labelbg="bg-slate-800"
											size="ml-2 relative -top-2"
											height="w-36"
										></AnimatedInputLabel>
									</div>
									<div class="flex flex-row">
										{#if data.homePage?.headline?.content}
											<AnimatedInputLabel
												name="Content"
												bind:value={data.homePage.headline.content}
												labelbg="bg-slate-800"
												size="ml-2"
												height="w-36"
											></AnimatedInputLabel>
										{/if}
										{#if data.homePage?.headline?.name}
											<AnimatedInputLabel
												name="Name"
												bind:value={data.homePage.headline.name}
												labelbg="bg-slate-800"
												size="ml-2"
												height="w-24"
											></AnimatedInputLabel>
										{/if}
									</div>
									{#if data.homePage?.headline?.tagline}
										{#each data.homePage.headline.tagline as text, i}
											<AnimatedInputLabel
												name="Tagline Word {i + 1}"
												bind:value={text}
												labelbg="bg-slate-800"
												size="ml-2"
												height="w-36"
											></AnimatedInputLabel>
										{/each}
									{/if}
								</div>
							</div>
							<div
								class="w-1/2 h-[75%] top-[7.8%] left-[45%] border-slate-500 border-[1px] rounded-2xl absolute flex flex-col overflow-auto"
								id="projects"
							>
								<h1 class="text-2xl text-center">Projects Preview</h1>
								<div class="flex flex-col w-full h-fit">
									{#each data.homePage.projects || templateProjectPreview as project}
										<div
											class="w-[90%] left-[5%] h-full border-slate-500 border-[1px] relative rounded-2xl mt-[2%]"
										>
											<input
												type="text"
												bind:value={project.name}
												class="relative right-[28%] text-xl bg-transparent focus:outline-none pl-2 focus:border-sky-500 transitiona-all duration-200 border-0 border-b"
											/>
											<AnimatedInputLabel
												name="Year"
												bind:value={project.date}
												labelbg="bg-slate-800"
												size="ml-2 -bottom-[15%]"
												mt="mt-[3%]"
												height="w-24"
												width="w-36"
											></AnimatedInputLabel>
											<AnimatedInputLabel
												name="Category"
												bind:value={project.category}
												labelbg="bg-slate-800"
												size="ml-2 left-[68%] -top-[65%]"
												mt="mt-[3%]"
												height="w-24"
												width="w-36"
											></AnimatedInputLabel>
											{#if project.technologies != undefined}
												<div
													class="absolute border-slate-500 border-[1px] w-fit pr-[10%] pb-2 pt-1 h-fit rounded-2xl right-[2%] bottom-[20%] flex flex-row"
												>
													<label
														for=""
														class="absolute left-[8%] text-md bottom-[100%]"
														>Technologies</label
													>
													{#each project.technologies || [{ name: 'tech', url: '' }, { name: 'somethingnew', url: '' }] as tech}
														<div
															class="border-slate-500 border-[1px] rounded-xl w-fit h-fit px-2 ml-2 mt-1 cursor-pointer flex flex-row"
														>
															{#if tech.url}
																<img
																	src={tech.logo}
																	alt={tech.name}
																	class="size-4 mr-2 mt-1"
																/>
																{tech.name}
															{:else}
																{tech.name}
															{/if}
															<button
																class="w-fit h-fit mt-[0.125rem] relative top-[3px] hover:text-red-500 ml-1"
																on:click={() => {
																	project.technologies =
																		project.technologies?.filter(
																			(t) => t !== tech
																		);
																}}
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="1.5"
																	stroke="currentColor"
																	class="size-4"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
																	/>
																</svg>
															</button>
														</div>
													{/each}
													<button
														class="ml-2 rotate-90 hover:text-sky-500 {newTechPopup &&
														selectedProjectPreview === project
															? 'hidden'
															: ''} relative w-fit h-fit mt-1"
														on:click={() => {
															newTechPopup = true;
															selectedProjectPreview = project;
															setTimeout(
																() =>
																	document
																		.getElementById('techPopup')
																		?.focus(),
																200
															);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="size-6"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
															/>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M6 6h.008v.008H6V6Z"
															/>
														</svg>
													</button>
													<div
														class="border-slate-500 border-[1px] rounded-xl min-w-16 w-fit h-7 px-2 ml-2 mt-1 focus:border-sky-500 {newTechPopup &&
														selectedProjectPreview === project
															? ''
															: 'hidden'} overflow-y-auto"
														on:focusout={() => (newTechPopup = false)}
														id="techPopup"
													>
														{#each technologies.filter((t) => !project.technologies?.find((tech) => tech.name === t.name)) as tech}
															<div>
																<button
																	on:click={() => {
																		if (
																			project.technologies &&
																			!project.technologies.find(
																				(t) =>
																					t.name ===
																					tech.name
																			)
																		) {
																			project.technologies = [
																				...project.technologies,
																				tech
																			];
																		}
																		newTechPopup = false;
																	}}
																	class="flex flex-row justify-center items-center mt-[0.125rem]"
																>
																	{#if tech.logo}
																		<img
																			src={tech.logo}
																			alt={tech.name}
																			class="size-4 mr-2"
																		/>
																		{tech.name}
																	{:else}
																		{tech.name}
																	{/if}
																</button>
															</div>
														{/each}
													</div>
												</div>
											{/if}
											<button
												class="absolute top-2 right-2 hover:text-red-500"
												on:click={() => {
													if (data.homePage?.projects)
														data.homePage.projects =
															data.homePage.projects.filter(
																(p) => p !== project
															);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</div>
									{/each}
								</div>
								<button
									on:click={() => {
										data.homePage?.projects?.push(templateProjectPreview);
										console.log('added project');
									}}
								>
									<Tooltip
										content="Add new project"
										tooltip_placement="w-32 h-fit px-2 ml-[4.5%] mt-[2%] transition-all duration-200 group absolute left-8 top-0"
										button_content={`<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6 group-hover:rotate-45 transition-all duration-200 group-hover:stroke-sky-500"
											on:click={() => {projects.push(templateProject)}}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>`}
										arrow={false}
										button_placement="w-fit h-fit px-2 ml-[4.5%] mt-[2%] transition-all duration-200 group absolute left-0"
									></Tooltip>
								</button>
							</div>
						{/if}
						<Button
							name="Save"
							more="absolute bottom-[4%] w-[4%] left-[48%] border-slate-500 border-[1px] rounded-3xl "
							onclick={async () => {
								await saveData();
							}}
						></Button>
					{:else if selectedPage === 'projects'}
						{#if data.projectsPage && data.projectsPage.engineeringProjects && data.projectsPage.programmingProjects}
							<div
								class="w-[46%] h-[75%] top-[7.8%] left-[2%] border-slate-500 border-[1px] rounded-2xl absolute flex flex-col overflow-auto"
								id="Engineering Projects"
							>
								<h1 class="text-2xl text-center">Engineering Projects</h1>
								<div class="flex flex-col w-full h-fit">
									{#each data.projectsPage.engineeringProjects || [] as project}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											class="w-[90%] left-[5%] h-full border-slate-500 border-[1px] relative rounded-2xl mt-[2%]"
										>
											<input
												type="text"
												bind:value={project.name}
												class="relative right-[28%] w-48 text-xl bg-transparent focus:outline-none pl-2 focus:border-sky-500 transitiona-all duration-200 border-0 border-b"
											/>
											<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
											<label
												for=""
												class="absolute left-[40%] top-[56%] peer cursor-pointer"
												on:click={() => {
													if (!project.description)
														project.description = {
															subheadings: [
																{
																	title: 'Sub Heading',
																	content: 'this is a subheading'
																}
															]
														};
													selectedProject = project;
													descriptionPopup = true;
												}}
											>
												Description
											</label>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<div
												class="absolute bg-transparent text-slate-400 left-[35%] rounded-2xl top-[50%] h-[30%] w-[25%] resize-none border-slate-500 border cursor-pointer"
												on:click={() => {
													if (!project.description)
														project.description = {
															subheadings: [
																{
																	title: 'Sub Heading',
																	content: 'this is a subheading'
																}
															]
														};
													selectedProject = project;
													descriptionPopup = true;
												}}
											></div>
											<AnimatedInputLabel
												name="Year"
												bind:value={project.date}
												labelbg="bg-slate-800"
												size="ml-2 -bottom-[15%]"
												mt="mt-[3%]"
												height="w-24"
												width="w-36"
											></AnimatedInputLabel>
											<AnimatedInputLabel
												name="Category"
												bind:value={project.category}
												labelbg="bg-slate-800"
												size="ml-2 left-[68%] -top-[65%]"
												mt="mt-[3%]"
												height="w-24"
												width="w-1/4"
											></AnimatedInputLabel>
											{#if project.technologies != undefined}
												<label
													for=""
													class="absolute right-[16%] text-md top-[38%]"
													>Technologies</label
												>
												<div
													class="absolute border-slate-500 border-[1px] pr-[10%] pb-2 pt-1 w-[36%] h-[30%] overflow-y-visible overflow-x-scroll rounded-2xl right-[2%] bottom-[20%] flex flex-row"
												>
													{#each project.technologies || [{ name: 'tech', url: '' }, { name: 'somethingnew', url: '' }] as tech}
														<div
															class="border-slate-500 border-[1px] rounded-xl w-fit h-fit px-2 ml-2 mt-1 cursor-pointer flex flex-row"
														>
															{#if tech.url}
																<img
																	src={tech.logo}
																	alt={tech.name}
																	class="size-4 mr-2 mt-1"
																/>
																{tech.name}
															{:else}
																{tech.name}
															{/if}
															<button
																class="w-fit h-fit mt-[0.125rem] mr-2 relative top-[3px] hover:text-red-500 ml-1"
																on:click={() => {
																	project.technologies =
																		project.technologies?.filter(
																			(t) => t !== tech
																		);
																}}
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="1.5"
																	stroke="currentColor"
																	class="size-4"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
																	/>
																</svg>
															</button>
														</div>
													{/each}
													<button
														class="ml-2 rotate-90 hover:text-sky-500 {newTechPopup &&
														selectedProjectPreview === project
															? 'hidden'
															: ''} relative w-fit h-fit mt-1"
														on:click={() => {
															newTechPopup = true;
															selectedProjectPreview = project;
															setTimeout(
																() =>
																	document
																		.getElementById('techPopup')
																		?.focus(),
																200
															);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="size-6"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
															/>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M6 6h.008v.008H6V6Z"
															/>
														</svg>
													</button>
													<div
														class="border-slate-500 border-[1px] rounded-xl min-w-16 w-fit h-7 px-2 ml-2 mt-1 focus:border-sky-500 {newTechPopup &&
														selectedProjectPreview === project
															? ''
															: 'hidden'} overflow-y-auto"
														on:focusout={() => (newTechPopup = false)}
														id="techPopup"
													>
														{#each technologies.filter((t) => !project.technologies?.find((tech) => tech.name === t.name)) as tech}
															<div>
																<button
																	on:click={() => {
																		if (
																			project.technologies &&
																			!project.technologies.find(
																				(t) =>
																					t.name ===
																					tech.name
																			)
																		) {
																			project.technologies = [
																				...project.technologies,
																				tech
																			];
																		}
																		newTechPopup = false;
																	}}
																	class="flex flex-row justify-center items-center mt-[0.125rem]"
																>
																	{#if tech.logo}
																		<img
																			src={tech.logo}
																			alt={tech.name}
																			class="size-4 mr-2"
																		/>
																		{tech.name}
																	{:else}
																		{tech.name}
																	{/if}
																</button>
															</div>
														{/each}
													</div>
												</div>
											{/if}
											<button
												class="absolute top-1 right-[0.125rem] hover:text-red-500"
												on:click={() => {
													if (data.projectsPage?.engineeringProjects)
														data.projectsPage.engineeringProjects =
															data.projectsPage.engineeringProjects.filter(
																(p) => p !== project
															);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</div>
									{/each}
								</div>
								<button
									on:click={() => {
										if (data.projectsPage)
											data.projectsPage.engineeringProjects = [
												...(data.projectsPage.engineeringProjects || []),
												templateProject
											];
										console.log('added project');
									}}
								>
									<Tooltip
										content="Add new project"
										tooltip_placement="w-32 h-fit px-2 ml-[4.5%] mt-[2%] transition-all duration-200 group absolute left-8 top-0"
										button_content={`<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6 group-hover:rotate-45 transition-all duration-200 group-hover:stroke-sky-500"
											on:click={() => {projects.push(templateProject)}}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>`}
										arrow={false}
										button_placement="w-fit h-fit px-2 ml-[4.5%] mt-[2%] transition-all duration-200 group absolute left-0"
									></Tooltip>
								</button>
							</div>
							<div
								class="w-[46%] h-[75%] top-[7.8%] right-[2%] border-slate-500 border-[1px] rounded-2xl absolute flex flex-col overflow-auto"
								id="Programming Projects"
							>
								<h1 class="text-2xl text-center">Programming Projects</h1>
								<div class="flex flex-col w-full h-fit">
									{#each data.projectsPage.programmingProjects || [] as project}
										<div
											class="w-[90%] left-[5%] h-full border-slate-500 border-[1px] relative rounded-2xl mt-[2%]"
										>
											<input
												type="text"
												bind:value={project.name}
												class="relative right-[28%] w-48 text-xl bg-transparent focus:outline-none pl-2 focus:border-sky-500 transitiona-all duration-200 border-0 border-b"
											/>
											<label for="" class="absolute left-[37%] top-[36%]">
												Description
											</label>
											<textarea
												name=""
												id=""
												class="absolute bg-transparent text-slate-400 left-[35%] rounded-2xl top-[50%] h-[30%] w-[25%] resize-none"
												bind:value={project.description}
											></textarea>
											<AnimatedInputLabel
												name="Year"
												bind:value={project.date}
												labelbg="bg-slate-800"
												size="ml-2 -bottom-[15%]"
												mt="mt-[3%]"
												height="w-24"
												width="w-36"
											></AnimatedInputLabel>
											<AnimatedInputLabel
												name="Category"
												bind:value={project.category}
												labelbg="bg-slate-800"
												size="ml-2 left-[68%] -top-[65%]"
												mt="mt-[3%]"
												height="w-24"
												width="w-1/4"
											></AnimatedInputLabel>
											{#if project.technologies != undefined}
												<label
													for=""
													class="absolute right-[16%] text-md top-[38%]"
													>Technologies</label
												>
												<div
													class="absolute border-slate-500 border-[1px] pr-[10%] pb-2 pt-1 w-[36%] h-[30%] overflow-y-visible overflow-x-scroll rounded-2xl right-[2%] bottom-[20%] flex flex-row"
												>
													{#each project.technologies || [{ name: 'tech', url: '' }, { name: 'somethingnew', url: '' }] as tech}
														<div
															class="border-slate-500 border-[1px] rounded-xl w-fit h-fit px-2 ml-2 mt-1 cursor-pointer flex flex-row"
														>
															{#if tech.url}
																<img
																	src={tech.logo}
																	alt={tech.name}
																	class="size-4 mr-2 mt-1"
																/>
																{tech.name}
															{:else}
																{tech.name}
															{/if}
															<button
																class="w-fit h-fit mt-[0.125rem] mr-2 relative top-[3px] hover:text-red-500 ml-1"
																on:click={() => {
																	project.technologies =
																		project.technologies?.filter(
																			(t) => t !== tech
																		);
																}}
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="1.5"
																	stroke="currentColor"
																	class="size-4"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
																	/>
																</svg>
															</button>
														</div>
													{/each}
													<button
														class="ml-2 rotate-90 hover:text-sky-500 {newTechPopup &&
														selectedProjectPreview === project
															? 'hidden'
															: ''} relative w-fit h-fit mt-1"
														on:click={() => {
															newTechPopup = true;
															selectedProjectPreview = project;
															setTimeout(
																() =>
																	document
																		.getElementById('techPopup')
																		?.focus(),
																200
															);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="size-6"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
															/>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M6 6h.008v.008H6V6Z"
															/>
														</svg>
													</button>
													<div
														class="border-slate-500 border-[1px] rounded-xl min-w-16 w-fit h-7 px-2 ml-2 mt-1 focus:border-sky-500 {newTechPopup &&
														selectedProjectPreview === project
															? ''
															: 'hidden'} overflow-y-auto"
														on:focusout={() => (newTechPopup = false)}
														id="techPopup"
													>
														{#each technologies.filter((t) => !project.technologies?.find((tech) => tech.name === t.name)) as tech}
															<div>
																<button
																	on:click={() => {
																		if (
																			project.technologies &&
																			!project.technologies.find(
																				(t) =>
																					t.name ===
																					tech.name
																			)
																		) {
																			project.technologies = [
																				...project.technologies,
																				tech
																			];
																		}
																		newTechPopup = false;
																	}}
																	class="flex flex-row justify-center items-center mt-[0.125rem]"
																>
																	{#if tech.logo}
																		<img
																			src={tech.logo}
																			alt={tech.name}
																			class="size-4 mr-2"
																		/>
																		{tech.name}
																	{:else}
																		{tech.name}
																	{/if}
																</button>
															</div>
														{/each}
													</div>
												</div>
											{/if}
											<button
												class="absolute top-1 right-[0.125rem] hover:text-red-500"
												on:click={() => {
													if (data.projectsPage?.engineeringProjects)
														data.projectsPage.engineeringProjects =
															data.projectsPage.engineeringProjects.filter(
																(p) => p !== project
															);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</div>
									{/each}
								</div>
								<button
									on:click={() => {
										if (data.projectsPage)
											data.projectsPage.engineeringProjects = [
												...(data.projectsPage.engineeringProjects || []),
												templateProject
											];
										console.log('added project');
									}}
								>
									<Tooltip
										content="Add new project"
										tooltip_placement="w-32 h-fit px-2 ml-[4.5%] mt-[2%] transition-all duration-200 group absolute left-8 top-0"
										button_content={`<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6 group-hover:rotate-45 transition-all duration-200 group-hover:stroke-sky-500"
											on:click={() => {projects.push(templateProject)}}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>`}
										arrow={false}
										button_placement="w-fit h-fit px-2 ml-[4.5%] mt-[2%] transition-all duration-200 group absolute left-0"
									></Tooltip>
								</button>
							</div>
							<Button
								name="Save"
								more="absolute bottom-[4%] w-[4%] left-[48%] border-slate-500 border-[1px] rounded-3xl "
								onclick={async () => {
									await saveData();
								}}
							></Button>
						{/if}
						<div
							class="{descriptionPopup
								? ''
								: 'hidden'} absolute border-2 bg-slate-800 border-slate-500 w-3/4 h-3/4 left-[12.5%] top-[10%] rounded-2xl shadow-2xl overflow-auto"
						>
							{#if selectedProject && selectedProject.description && selectedProject.description.subheadings}
								<label for="" class="absolute left-[4%] top-[4%]">
									Project Overview:
								</label>
								<textarea
									name="overview"
									id=""
									class="absolute bg-transparent resize-none left-[2.5%] top-[8%] rounded-2xl w-[95%] h-[20%]"
									bind:value={selectedProject.description.overview}
								/>
								<div class="absolute w-full h-full top-[30%]">
									{#each selectedProject.description.subheadings || [] as subHeading}
										<div
											class="w-[95%] left-[2.5%] mt-[2%] px-[2%] h-1/2 border border-slate-500 relative rounded-2xl"
										>
											<label
												for=""
												class="absolute left-[4%] top-[6%] text-xl"
											>
												Title:
											</label>
											<input
												type="text"
												bind:value={subHeading.title}
												class="absolute left-[10%] w-48 text-xl bg-transparent focus:outline-none pl-2 focus:border-sky-500 transitiona-all duration-200 border-0 border-b"
											/>
											<label
												class="inline-flex items-center cursor-pointer absolute left-[4%] top-[24%]"
											>
												<input
													type="checkbox"
													bind:checked={subHeading.html}
													class="sr-only peer"
												/>
												<div
													class="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer bg-slate-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
												></div>
												<span
													class="ms-3 text-sm font-medium text-slate-400 dark:text-gray-300"
													>HTML</span
												>
											</label>
											<label for="" class="absolute left-[4%] top-[36%]">
												Content:
											</label>
											<textarea
												name="content"
												id=""
												class="absolute bg-transparent resize-none left-[2%] top-[50%] rounded-2xl w-[40%] h-[40%]"
												bind:value={subHeading.content}
											/>
											<div
												id="Sub Heading Images"
												class=" absolute w-[50%] right-[2.5%] mt-[1.25%] px-[2%] h-[90%] border border-slate-500 rounded-2xl overflow-auto {subHeading.html ||
												subHeading.subheadings
													? 'hidden'
													: ''}"
											>
												<h1 class="text-xl">Images</h1>
												{#each subHeading.images || [] as image}
													<div
														class="w-[95%] h-[80%] border border-slate-500 relative rounded-2xl overflow-auto"
													>
														<AnimatedInputLabel
															name="Image URL"
															bind:value={image.imgURL}
															labelbg="bg-slate-800"
															size="ml-2 relative -top-2"
															height="w-12"
														></AnimatedInputLabel>
														<AnimatedInputLabel
															name="Image Alt"
															bind:value={image.alt}
															labelbg="bg-slate-800"
															size="ml-2 relative -top-2"
															height="w-12"
														></AnimatedInputLabel>
														<AnimatedInputLabel
															name="Image Caption"
															bind:value={image.caption}
															labelbg="bg-slate-800"
															size="ml-2 relative -top-2"
															height="w-12"
														></AnimatedInputLabel>
														<AnimatedInputLabel
															name="CSS (Tailwind style)"
															bind:value={image.css}
															labelbg="bg-slate-800"
															size="ml-2 relative -top-2"
															height="w-12"
														></AnimatedInputLabel>
														<Image
															{image}
															divStyle="right-[2%] top-[40%] "
														/>
														<button
															class="absolute top-1 right-[0.125rem] hover:text-red-500"
															on:click={() => {
																if (subHeading.images)
																	subHeading.images =
																		subHeading.images.filter(
																			(i) => i !== image
																		);
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="1.5"
																stroke="currentColor"
																class="size-5"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
																/>
															</svg>
														</button>
													</div>
												{/each}
												<button
													class="group absolute left-[4%]"
													on:click={() => {
														if (subHeading)
															subHeading.images = [
																...(subHeading.images || []),
																{ imgURL: '', alt: '', caption: '' }
															];
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="size-6 group-hover:rotate-45 transition-all duration-200 group-hover:stroke-sky-500"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M12 4.5v15m7.5-7.5h-15"
														/>
													</svg>
												</button>
											</div>
											<div
												class="absolute w-[50%] right-[2.5%] mt-[1.25%] px-[2%] h-[90%] border border-slate-500 rounded-2xl overflow-auto {subHeading.html
													? ''
													: 'hidden'}"
											>
												{@html subHeading.content}
											</div>
											<div
												class="absolute w-[50%] right-[2.5%] mt-[1.25%] px-[2%] h-[90%] border border-slate-500 rounded-2xl overflow-auto {subHeading.subheadings
													? ''
													: 'hidden'}"
											>
												<button
													on:click={() => {
														subsubheadingsPopup = true;
														selectedSubHeading = subHeading;
													}}
													class="border border-slate-500 hover:text-sky-500 hover:scale-105 transition-all duration-200 p-2 rounded-2xl mt-[2%]"
												>
													Open Sub-Sub Headings popup
												</button>
											</div>

											<button
												class="absolute top-1 right-[0.125rem] hover:text-red-500"
												on:click={() => {
													if (selectedProject?.description?.subheadings)
														selectedProject.description.subheadings =
															selectedProject.description.subheadings.filter(
																(s) => s !== subHeading
															);
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</div>
									{/each}
									<button
										class="group absolute left-[4%]"
										on:click={() => {
											if (selectedProject.description)
												selectedProject.description.subheadings = [
													...(selectedProject.description.subheadings ||
														[]),
													{
														title: 'Sub Heading',
														content: '',
														images: []
													}
												];
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6 group-hover:rotate-45 transition-all duration-200 group-hover:stroke-sky-500"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
									</button>
								</div>
								<button
									class="group absolute top-1 right-1"
									on:click={() => {
										descriptionPopup = false;
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6 rotate-45 transition-all duration-200 group-hover:stroke-red-500"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 4.5v15m7.5-7.5h-15"
										/>
									</svg>
								</button>
							{/if}
						</div>
						<div
							class="absolute border-2 bg-slate-800 border-slate-500 w-3/4 h-3/4 left-[12.5%] top-[10%] rounded-2xl shadow-2xl overflow-auto {subsubheadingsPopup
								? ''
								: 'hidden'}"
						>
							{#if selectedSubHeading && selectedSubHeading.subheadings}
								{#each selectedSubHeading.subheadings || [] as subsubHeading}
									<div
										class="w-[95%] left-[2.5%] mt-[2%] px-[2%] h-1/2 border border-slate-500 relative rounded-2xl"
									>
										<label for="" class="absolute left-[4%] top-[6%] text-sm">
											Title:
										</label>
										<input
											type="text"
											bind:value={subsubHeading.title}
											class="absolute left-[10%] w-48 text-xl bg-transparent focus:outline-none pl-2 focus:border-sky-500 transitiona-all duration-200 border-0 border-b"
										/>
										<label
											class="inline-flex items-center cursor-pointer absolute left-[4%] top-[24%]"
										>
											<input
												type="checkbox"
												bind:checked={subsubHeading.html}
												class="sr-only peer"
											/>
											<div
												class="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer bg-slate-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
											></div>
											<span
												class="ms-3 text-sm font-medium text-slate-400 dark:text-gray-300"
												>HTML</span
											>
										</label>
										<label for="" class="absolute left-[4%] top-[36%]">
											Content:
										</label>
										<textarea
											name="content"
											id=""
											class="absolute bg-transparent resize-none left-[2%] top-[50%] rounded-2xl w-[40%] h-[40%]"
											bind:value={subsubHeading.content}
										/>
										<div
											id="Sub Heading Images"
											class=" absolute w-[50%] right-[2.5%] mt-[1.25%] px-[2%] h-[90%] border border-slate-500 rounded-2xl overflow-auto {subsubHeading.html
												? 'hidden'
												: ''}"
										>
											<h1 class="text-xl">Images</h1>
											{#each subsubHeading.images || [] as image}
												<div
													class="w-[95%] h-[80%] border border-slate-500 relative rounded-2xl overflow-auto"
												>
													<AnimatedInputLabel
														name="Image URL"
														bind:value={image.imgURL}
														labelbg="bg-slate-800"
														size="ml-2 relative -top-2"
														height="w-12"
													></AnimatedInputLabel>
													<AnimatedInputLabel
														name="Image Alt"
														bind:value={image.alt}
														labelbg="bg-slate-800"
														size="ml-2 relative -top-2"
														height="w-12"
													></AnimatedInputLabel>
													<AnimatedInputLabel
														name="Image Caption"
														bind:value={image.caption}
														labelbg="bg-slate-800"
														size="ml-2 relative -top-2"
														height="w-12"
													></AnimatedInputLabel>
													<AnimatedInputLabel
														name="CSS (Tailwind style)"
														bind:value={image.css}
														labelbg="bg-slate-800"
														size="ml-2 relative -top-2"
														height="w-12"
													></AnimatedInputLabel>
													<Image
														{image}
														divStyle="right-[2%] top-[40%] "
													/>
													<button
														class="absolute top-1 right-[0.125rem] hover:text-red-500"
														on:click={() => {
															if (subsubHeading.images)
																subsubHeading.images =
																	subsubHeading.images.filter(
																		(i) => i !== image
																	);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="size-5"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
															/>
														</svg>
													</button>
												</div>
											{/each}
											<button
												class="group absolute left-[4%]"
												on:click={() => {
													if (subsubHeading)
														subsubHeading.images = [
															...(subsubHeading.images || []),
															{
																imgURL: '',
																alt: '',
																caption: ''
															}
														];
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-6 group-hover:rotate-45 transition-all duration-200 group-hover:stroke-sky-500"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 4.5v15m7.5-7.5h-15"
													/>
												</svg>
											</button>
										</div>
										<div
											class="absolute w-[50%] right-[2.5%] mt-[1.25%] px-[2%] h-[90%] border border-slate-500 rounded-2xl overflow-auto {subsubHeading.html
												? ''
												: 'hidden'}"
										>
											{@html subsubHeading.content}
										</div>
										<div
											class="absolute w-[50%] right-[2.5%] mt-[1.25%] px-[2%] h-[90%] border border-slate-500 rounded-2xl overflow-auto {subsubHeading.subheadings
												? ''
												: 'hidden'}"
										></div>
										<button
											class="absolute top-1 right-[0.125rem] hover:text-red-500"
											on:click={() => {
												if (selectedSubHeading.subheadings)
													selectedSubHeading.subheadings =
														selectedSubHeading.subheadings.filter(
															(s) => s !== subsubHeading
														);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="size-5"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
												/>
											</svg>
										</button>
									
									</div>
								{/each}
							{/if}
							<button
							class="group absolute top-1 right-1"
							on:click={() => {
								subsubheadingsPopup = false;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6 rotate-45 transition-all duration-200 group-hover:stroke-red-500"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</button>
						</div>
					{:else if selectedPage === 'about-me'}{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
