<script lang="ts">
	import { onMount } from 'svelte';
	import Scrollbar from 'smooth-scrollbar';
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

<div class="h-[88vh] bg-slate-800 text-slate-400 overflow-auto scroll-m-8 w-screen" id="scrollable">
	{#await getData()}
		<h1>Loading...</h1>
	{:then data}
		<div class="h-full overflow-auto">
			{#each projects as project, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<Project {project} {i} length={projects.length}></Project>
			{/each}
		</div>
	{/await}
</div>
