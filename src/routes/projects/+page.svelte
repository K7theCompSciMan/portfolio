<script lang="ts">
	import Heading from '$lib/Heading.svelte';
	import WordGuesser from '$lib/images/WordGuesser.png';
	import AudioPlayer from '$lib/images/AudioPlayer.png';
	import PongGame from '$lib/images/PongGame.png';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Scrollbar  from 'smooth-scrollbar';
	import Button from '$lib/Button.svelte';
	import { getData, type Project } from '$lib';
	let projects: Project[] = []
	onMount(async() => {
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false,
		});
		let data = (await getData()).projectsPage;
		projects = [...(data?.engineeringProjects || []), ...(data?.programmingProjects || [])]
	});
</script>

<div class="h-[87.8vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar fixed w-screen " id="scrollable">
	{#each projects as project}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex h-1/2 px-48 py-8 border-b-4 border-sky-400">
			{#if projects.indexOf(project) % 2 == 0}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					src={project.image}
					alt={project.name}
					class="rounded-2xl w-auto h-auto hover:cursor-pointer"
					on:click={() => window.open(project.url, '_blank')}
				/>

				<div class="text-xl relative overflow-auto h-full" style="width: 100%">
					<strong>{project.name}</strong>
					<br />
					<br />
					<p class="relative w-2/3" style="left: 16.66666%">
						{project.description}
					</p>
				</div>
			{:else}
				<div class="text-xl relative overflow-auto h-full" style="width: 100%">
					<strong>{project.name}</strong>
					<br />
					<br />
					<p class="relative w-2/3" style="left: 16.66666%">
						{project.description}
					</p>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					src={project.image}
					alt={project.name}
					class="rounded-2xl w-auto h-auto hover:cursor-pointer"
					on:click={() => window.open(project.url, '_blank')}
				/>
			{/if}
		</div>
	{/each}
</div>
