<script lang="ts">
	import Tooltip from './../lib/Tooltip.svelte';
	import Heading from '$lib/Heading.svelte';
	import src from '$lib/images/kesavan.jpeg';
	import Scrollbar from 'smooth-scrollbar';
	import { onMount } from 'svelte';
	import { fly, draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	onMount(() => {
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false
		});
	});
</script>

<div
	class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar"
	id="scrollable"
	in:fly={{ y: -100 }}
>
	<br />
	<div class="text-6xl flex flex-col mt-[10%] justify-center items-center scale-150">
		<div class="flex flex-row text-2xl">
			<img {src} alt="Kesavan Rangarajan" class="rounded-full text-sm w-16 h-16" />
			<h1
				class="ml-4 text-center align-middle h-fit mt-1 rounded-3xl border-[1px] border-slate-500 p-2"
			>
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				Hi, I'm
				<span class="cursor-pointer" id="wrapper">Kesavan!</span>
			</h1>
			<button
				class="w-fit h-fit mt-4 ml-1"
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
			</button>
			<Tooltip content="Marietta, Georgia, United States" id="location-tooltip"></Tooltip>
		</div>
		{#each ['DEVELOPER,', 'ENGINEER,', 'LEADER'] as text, i}
			<span
				class="font-bold {i == 0 ? 'text-sky-500' : ''} {i == 1
					? 'text-rose-200'
					: ''} {i == 2 ? 'text-violet-600' : ''} mb-3 cursor-pointer">{text}</span
			>
		{/each}
	</div>
</div>
