<script>
	import { fly } from "svelte/transition";

    export let project;
    export let length;
    export let i;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex border-slate-500 border-y h-1/3 group transition-all duration-200 cursor-pointer {i +
		1 <
	length
		? 'mb-[2%]'
		: 'mb-[10%]'}"
	in:fly={{ x: -100, delay: 100, duration: 3000 }}
	on:click={() =>
		(window.location.pathname = `/projects/${project.name?.trim().replaceAll(' ', '-')}`)}
>
	<div
		class="relative overflow-auto h-full w-1/3 text-left pl-[4%] py-[4%] flex flex-col group-hover:pl-[8%] transition-all duration-[400ms]"
	>
		<div
			class="text-2xl font-bold transition-all duration-[400ms] group-hover:text-sky-500 flex items-center gap-[2%]"
		>
			{project.name}
			{#if project.completed}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 stroke-green-500"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			{:else}
				<svg
					fill="#000000"
					version="1.1"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 24 24"
					xml:space="preserve"
					class="size-6 fill-none stroke-blue-500 border-none border-0"
				>
					<path
						d="M11.7,2c-0.1,0-0.1,0-0.2,0c0,0,0,0-0.1,0v0c-0.2,0-0.3,0-0.5,0l0.2,2c0.4,0,0.9,0,1.3,0c4,0.3,7.3,3.5,7.5,7.6
	c0.2,4.4-3.2,8.2-7.6,8.4c0,0-0.1,0-0.2,0c-0.3,0-0.7,0-1,0L11,22c0.4,0,0.8,0,1.3,0c0.1,0,0.3,0,0.4,0v0c5.4-0.4,9.5-5,9.3-10.4
	c-0.2-5.1-4.3-9.1-9.3-9.5v0c0,0,0,0,0,0c-0.2,0-0.3,0-0.5,0C12,2,11.9,2,11.7,2z M8.2,2.7C7.7,3,7.2,3.2,6.7,3.5l1.1,1.7
	C8.1,5,8.5,4.8,8.9,4.6L8.2,2.7z M4.5,5.4c-0.4,0.4-0.7,0.9-1,1.3l1.7,1C5.4,7.4,5.7,7.1,6,6.7L4.5,5.4z M15.4,8.4l-4.6,5.2
	l-2.7-2.1L7,13.2l4.2,3.2l5.8-6.6L15.4,8.4z M2.4,9c-0.2,0.5-0.3,1.1-0.3,1.6l2,0.3c0.1-0.4,0.1-0.9,0.3-1.3L2.4,9z M4.1,13l-2,0.2
	c0,0.1,0,0.2,0,0.3c0.1,0.4,0.2,0.9,0.3,1.3l1.9-0.6c-0.1-0.3-0.2-0.7-0.2-1.1L4.1,13z M5.2,16.2l-1.7,1.1c0.3,0.5,0.6,0.9,1,1.3
	L6,17.3C5.7,16.9,5.4,16.6,5.2,16.2z M7.8,18.8l-1.1,1.7c0.5,0.3,1,0.5,1.5,0.8l0.8-1.8C8.5,19.2,8.1,19,7.8,18.8z"
					/>
				</svg>
			{/if}
		</div>
		<div class="text-md pl-[4%] font-thin">{project.date}</div>
	</div>
	<div
		class="relative overflow-auto h-full w-1/2 text-right ml-[33%] py-[4%] pr-[4%] flex flex-col group-hover:pr-[8%] transition-all duration-[400ms]"
	>
		<div class="text-2xl font-bold">{project.category}</div>
		<div class="flex flex-row-reverse">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#each project.technologies?.reverse() || [] as tech}
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
