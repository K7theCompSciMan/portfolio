<script lang="ts">
	import { page } from '$app/stores';
	import { getData, type Project } from '$lib';
	import Image from '$lib/Image.svelte';
	import Scrollbar from 'smooth-scrollbar';
	import { onMount } from 'svelte';
	let project: Project | undefined;
	onMount(async () => {
		// Scrollbar.init(document.querySelector('#scrollable')!, {
		// 	damping: 0.1,
		// 	thumbMinSize: 0,
		// 	renderByPixels: true,
		// 	alwaysShowTracks: false
		// });
		let data = await getData();
		project = data.projectsPage?.engineeringProjects?.find(
			(p) => p.name?.trim().replaceAll(' ', '-') === $page.params.projectName.trim().replaceAll(' ', '-')
		);
	});
	$: console.log(project);
</script>

<div
	class="h-[88.3vh] text-slate-400 overflow-auto scroll-m-8 fixed w-screen bg-slate-800"
	id="scrollable"
>
	{#if project}
		<h1 class="text-4xl mt-[2%] font-bold text-sky-500">{project.name}</h1>
		<div class="relative w-3/4 left-[12.5%]">
			<h1 class="text-3xl mt-[2%] font-semi-bold text-sky-500 mb-2 text-left underline">
				Overview
			</h1>
			<p class="relative text-left text-xl pl-[12.5%]">{project.description?.overview}</p>
		</div>
		{#each project.description?.subheadings || [] as subHeading}
			<div class="relative left-[12.5%] w-[75%] mt-[2%] mb-[2%]">
				<h1
					class="relative text-3xl mt-[2%] font-semi-bold text-sky-500 mb-2 text-left underline"
				>
					{subHeading.title || ''}
				</h1>
				{#if subHeading.html}
					{@html subHeading.content}
				{:else}
					<p class="relative text-left text-xl pl-[12.5%]">{subHeading.content}</p>
				{/if}
                {#each subHeading.subheadings || [] as subsubHeading}
                <div class="relative left-[12.5%] w-[75%] mt-[2%] mb-[2%]">
                    <h1
                    class="relative text-3xl mt-[2%] font-semi-bold text-sky-500 mb-2 text-left underline"
                    >
                        {subsubHeading.title || ''}
                    </h1>
                    {#if subsubHeading.html}
                    {@html subsubHeading.content}
                    {:else}
                    <p class="relative text-left text-xl pl-[12.5%]">{subsubHeading.content}</p>
                    {/if}
                </div>
                {#each subsubHeading.images || [] as image}
                    <Image {image}></Image>
                    {/each}
                    
                    {/each}
                </div>
                <div class="absolute right-0">
                </div>
                {/each}
	{/if}
</div>
