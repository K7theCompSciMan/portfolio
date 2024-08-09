<script lang="ts">
	import Heading from '$lib/Heading.svelte';
	import WordGuesser from '$lib/images/WordGuesser.png';
	import AudioPlayer from '$lib/images/AudioPlayer.png';
	import PongGame from '$lib/images/PongGame.png';
	import { goto } from '$app/navigation';
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

<div class="text-black" style="height: 92.7vh;">
	<Heading text="Projects" />
	{#each projects as project}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex h-1/2 px-48 py-8 border-b-4 border-sky-400">
			{#if projects.indexOf(project) % 2 == 0}
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
	{/each}
</div>
