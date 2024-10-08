<script lang="ts">
	import { goto } from '$app/navigation';
	import { getData, type Project as ProjectType } from '$lib';
	import Project from '$lib/Project.svelte';
	import Scrollbar from 'smooth-scrollbar';
	import { onMount } from 'svelte';
	let projects: ProjectType[] = [];
	onMount(async () => {
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false
		});
		let data = await getData();
		projects = data.projectsPage?.engineeringProjects || [];
		projects.sort((a, b) => (a.date! as unknown as number) - (b.date! as unknown as number));
		projects.reverse();
	});
	$: console.log(projects);
</script>

<div
	class="h-[87.8vh] text-slate-400 overflow-auto no-scrollbar::-webkit-scrollbar"
	id="scrollable"
>
<div class="h-full overflow-auto ">
	{#each projects as project, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<Project {project} {i} length={projects.length}></Project>
	{/each}
</div>
</div>
