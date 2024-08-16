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
	import Saos from 'saos';
	onMount(() => {
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false
		});
	});
	interface Project {
		link?: string;
		title: string;
		img: string;
		description: string;
	}
	let wordGuesser: Project = {
		link: 'https://my-wordle-stuff.vercel.app/',
		title: 'Word Guesser',
		img: WordGuesser,
		description:
			'I made this word guessing game in two versions. One was made using Svelte, like this website, and the other was made using plain HTML, CSS, and JavaScript. I really enjoyed working on this project. It taught me lots about web development. I learned about apis, including fetching them, and using them. This was also my first project I made using svelte, and I used many of the features that Svelte brags, including iteration and logic statements within html tags. I also used tailwindcss for styiling, and it was very enjoyable. This project was a very fun project, yet it also came with its own difficulties. It had also taught me lots about programming and web development. I had lots of failures, and lots of unexpected problems, yet in the end, I had perservered through it all, and finished with a product I am very proud of.'
	};

	let audioPlayer: Project = {
		link: 'https://github.com/K7theCompSciMan/My-Coding-Stuff/blob/master/Java/Practice/AudioFrame.java',
		title: 'Audio Player',
		img: AudioPlayer,
		description:
			'This program was one of the first programs I had made using Java. It was a very fun project, and it taught me lots about Java. This project mostly used the Java GUI libraries, and it tested my abilities and proficiency with Java GUI. This project also taught me about object oriented programming, one of the most important principles of programming. Using the skills I learned working on this project, I plan on making many more Java GUI programs. This could range from simple games, to applications that I use on a daily basis, like an offline video player.'
	};

	let pongGame: Project = {
		link: 'https://github.com/K7theCompSciMan/My-Coding-Stuff/blob/master/Python/pong.py',
		title: 'Pong Game',
		img: PongGame,
		description:
			'This project was made using the pygame library in Python. It was a very fun project, and it taught me lots about Python. This project mostly used the pygame library, and it tested my abilities and proficiency with Python. This project also taught me about pygame, as I was interested in game development. I had wanted to use pygame to create some sort of game in Python, and this was the first one I had made. It was a difficult project and taught me a lot about pygame, and libraries in Python. Using the skills I learned working on this project, I plan on making many more python programs. I plan on making more games, using pygame or other libraries, but also making programs that teach me more about this wonderful language, and the wonders of computer science.'
	};

	let projects: any[] = [wordGuesser, audioPlayer, pongGame];
</script>

<div
	class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar flex flex-col fixed"
	id="scrollable"
>
	<br />
	<div
		class="text-6xl flex flex-col mt-[10%] justify-center items-center border-b-[1px] border-slate-500 pb-[20%]"
		in:fly={{ y: -100 }}
	>
		<div class="flex flex-row text-2xl scale-150 pb-6">
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
	<div class="ml-[8%] w-[84%] mt-[2%]">
		<h1 class="w-full h-fit text-4xl text-violet-600 text-start border-b-2 border-slate-500 pb-4">
			My Projects
		</h1>
		<div id="projects" class="">
			{#each projects as project, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<Saos animation={'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'}
				animation_out={'slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'}
				top={250}
				bottom={250}>
				<div class="flex h-96 {i != projects.length-1 ?  "border-b-[1px]" : ""} border-slate-500 py-4" in:fly={{x: i%2==0 ? -100:100}}>
					{#if i % 2 == 0}
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<img
							src={project.img}
							alt={project.title}
							class="rounded-2xl w-auto h-auto hover:cursor-pointer"
							on:click={() => window.open(project.link, '_blank')}
						/>

						<div class="text-xl relative overflow-auto h-full" style="width: 100%">
							<strong>{project.title}</strong>
							<br />
							<br />
							<p class="relative w-2/3" style="left: 16.66666%">
								{project.description}
							</p>
						</div>
					{:else}
						<div class="text-xl relative overflow-auto h-full" style="width: 100%">
							<strong>{project.title}</strong>
							<br />
							<br />
							<p class="relative w-2/3" style="left: 16.66666%">
								{project.description}
							</p>
						</div>
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<img
							src={project.img}
							alt={project.title}
							class="rounded-2xl w-auto h-auto hover:cursor-pointer"
							on:click={() => window.open(project.link, '_blank')}
						/>
					{/if}
				</div>
			</Saos>
			{/each}
		</div>
	</div>
</div>
