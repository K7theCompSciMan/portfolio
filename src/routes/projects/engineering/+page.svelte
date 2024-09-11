<script lang="ts">
	import { goto } from '$app/navigation';
	import { getData, type Project } from '$lib';
	import Scrollbar from 'smooth-scrollbar';
	import { onMount } from 'svelte';
	let projects: Project[] = [];
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
    $: console.log(projects)
</script>

<div
	class="h-[87.8vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar"
	id="scrollable"
>
	{#each projects as project, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex border-slate-500 border rounded-2xl w-[95%] relative left-[2.5%] mt-[2%] h-1/3 group transition-all duration-200 cursor-pointer {i +
				1 <
			projects.length
				? 'mb-[2%]'
				: 'mb-[10%]'}"
                on:click={() => window.location.pathname=`/projects/${project.name?.trim().replaceAll(' ', '-')}`}
		>
			<div
				class="relative overflow-auto h-full w-1/3 text-left pl-[4%] py-[4%] flex flex-col group-hover:pl-[8%] transition-all duration-[400ms]"
			>
				<div
					class="text-2xl font-bold transition-all duration-[400ms] group-hover:text-sky-500"
				>
					{project.name}
				</div>
				<div class="text-md pl-[4%] font-thin">{project.date}</div>
			</div>
            <div class="w-1/3 text-center align-middle text-ellipsis flex flex-col justify-center group-hover:text-sky-500 transition-all duration-200">
                    {project.description?.overview}
            </div>
			<div
				class="relative overflow-auto h-full w-1/3 text-right  py-[4%] pr-[4%] flex flex-col group-hover:pr-[8%] transition-all duration-[400ms]"
			>
				<div class="text-2xl font-bold">{project.category}</div>
				<div class="flex flex-row-reverse">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					{#each project.technologies || [] as tech}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="border-slate-500 text-left border-[1px] rounded-xl h-6 w-fit max-w-full overflow-clip px-2 pb-4 ml-2 mt-1 cursor-pointer flex flex-row"
							on:click={() => window.open(tech.url, '_blank')}
						>
							<img src={tech.logo} alt={tech.name} class="size-4 mr-2 mt-1" />
							{tech.name}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>
