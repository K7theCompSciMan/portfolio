<script lang="ts">
	import Heading from '$lib/Heading.svelte';
	import src from '$lib/images/kesavan.jpeg';
</script>

<div class="text-black justify-center items-center" style="height: 92.7vh;">
	<Heading />
	<br />

	<img
		{src}
		alt="Kesavan Rangarajan"
		class="relative rounded-2xl"
		style="width: fit-content; height: 45%; left: 50%; transform: translateX(-50%);"
	/>
	<p class="text-xl relative pt-2" style="left: 20%; width: 60%">
		<strong>
			Hi! My name is Kesavan Rangarajan, and I am a 10th grade student in the magnet program at
			Wheeler High School.
		</strong>
	</p>

	<br />
	<p class=" relative indent-20 text-lg" style="width: 90%; left: 5%;">
		I have always loved working with computers. My interest in computer science began two years ago.
		My cousin had been developing a video game, and I had become entranced by it. I wanted to know
		everything about it, from how it works, to how to make one. I began learning how to code,
		starting with a video game development course from Udemy. When I got to high school, I took an
		AP Computer Science Principles class, and began to learn more about computer science. This class
		induced me to continue learning about computer science and programming, and I began to delve
		into the world of programming. It began with Java, as I had learned Python in the class, but
		then quickly expanded to other languages, such as JavaScript, TypeScript, and even Svelte, which
		is how I made this website. I love to learn about anything when it comes to computer science.
		Whether it is quantum computing, or web development, I love to learn about it. Some of my major
		projects are highlighted in the <strong>Projects</strong> page.
	</p>
</div>
