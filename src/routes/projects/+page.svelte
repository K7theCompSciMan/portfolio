<script lang="ts">
	import Heading from '$lib/Heading.svelte';
	import WordGuesser from '$lib/images/WordGuesser.png';
	import AudioPlayer from '$lib/images/AudioPlayer.png';
	import PongGame from '$lib/images/PongGame.png';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Scrollbar from 'smooth-scrollbar';
	import Button from '$lib/Button.svelte';
	import { getData, type Project as ProjectType } from '$lib';
	import Project from '$lib/Project.svelte';
	let projects: ProjectType[] = [];
	onMount(async () => {
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false
		});
		let data = (await getData()).projectsPage;
		projects = [
			...(data?.engineeringProjects || []),
			...(data?.programmingProjects || [])
		].sort((a, b) => (b.date! as unknown as number) - (a.date! as unknown as number));
	});
</script>

<div
	class="h-[88vh] bg-slate-800 text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar fixed w-screen"
	id="scrollable"
>
	{#await getData()}
		<h1>Loading...</h1>
	{:then data}
		{#each projects as project, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<Project {project} {i} length={projects.length}></Project>

		{/each}
	{/await}
</div>
