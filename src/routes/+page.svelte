<script lang="ts">
	import Tooltip from '$lib/Tooltip.svelte';
	import src from '$lib/images/kesavan.jpeg';
	import Scrollbar from 'smooth-scrollbar';
	import { onMount } from 'svelte';
	import { fly, draw } from 'svelte/transition';
	import Heading from '$lib/Heading.svelte';
	import WordGuesser from '$lib/images/WordGuesser.png';
	import AudioPlayer from '$lib/images/AudioPlayer.png';
	import PongGame from '$lib/images/PongGame.png';
	import AnimatedText from '$lib/AnimatedText.svelte';
	import { goto } from '$app/navigation';
	import { getData, type Data } from '$lib';
	import ProjectPreview from '$lib/ProjectPreview.svelte';
	let data: Data = {
		homePage: {
			headline: {
				tagline: ['']
			}
		}
	};
	onMount(async () => {
		data = await getData();
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false
		});
		if (data.homePage) {
			data.homePage?.projects?.sort(
				(a, b) => (b.date! as unknown as number) - (a.date! as unknown as number)
			);
			console.log(data.homePage.projects);
		}
	});
</script>

{#await getData()}
	<h1
		class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar flex flex-col fixed bg-slate-800 w-screen"
		id="scrollable"
	>
		Loading...
	</h1>
{:then something}
	<div
		class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar flex flex-col fixed bg-slate-800 w-screen"
		id="scrollable"
	>
		<br />
		<div
			class="text-6xl flex flex-col mt-[10%] justify-center items-center border-b-[1px] border-slate-500 pb-[20%]"
			in:fly={{ y: -100, duration: 1000 }}
		>
			{#if data.homePage?.headline}
				<div class="flex flex-row text-2xl scale-150 pb-6 relative">
					<img
						src={data.homePage.headline.imgURL}
						alt="Kesavan Rangarajan"
						class="rounded-full text-sm w-16 h-16"
					/>
					<h1
						class="ml-4 text-center align-middle h-fit mt-1 rounded-3xl border-[1px] border-slate-500 p-2 transition-all"
					>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						{data.homePage.headline.content}
						<AnimatedText
							text={data.homePage.headline.name || ''}
							targeturl="/about-me"
						/>
					</h1>
					<!-- <button
						class="w-fit h-fit mt-4 ml-1 hover:text-sky-500 transition-all duration-75 peer"
						data-tooltip-target="location-tooltip"
						type="button"
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
								d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
							/>
						</svg>
					</button> -->
					<Tooltip
						content={data.homePage.headline.location ||
							'Atlanta, Georgia, United States'}
						tooltip_placement="w-[800%] -top-[60%] -right-[350%]"
					></Tooltip>
				</div>
				{#each data.homePage.headline.tagline || [] as text, i}
					<span
						class="font-bold {i == 0 ? 'text-sky-500' : ''} {i == 1
							? 'text-rose-200'
							: ''} {i == 2 ? 'text-violet-600' : ''} mb-3 cursor-default"
						>{text}</span
					>
				{/each}
			{/if}
		</div>
		<div class="ml-[8%] w-[84%] mt-[2%]" id="info"></div>
		<div class="ml-[8%] w-[84%] mt-[2%]">
			<h1
				class="w-full h-fit text-4xl text-violet-600 text-start border-b-2 border-slate-500 pb-4 mb-4"
			>
				My Latest Projects
			</h1>
			{#if data.homePage?.projects}
				<div id="projects" class="">
					{#each data.homePage.projects || [{ name: 'Word Guesser', date: '2022', category: 'Web Dev', technologies: [{ name: 'Svelte', url: 'https://svelte.dev/' }] }] as project, i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<ProjectPreview {project} length={data.homePage.projects.length} {i}></ProjectPreview>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/await}
