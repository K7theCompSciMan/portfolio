<script lang="ts">
	import '../app.postcss';
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="max-h-screen justify-center text-center">
	<nav>
		<Button name="Home" onclick={() => goto('/')} />
		<Button name="Projects" onclick={() => goto('/projects')} />
		<Button name="Resume" onclick={() => goto('/resume')} />
		<Button name="Contact" onclick={() => goto('/contact')} />
		<Button
			name="GitHub"
			onclick={() => window.open('https://github.com/K7theCompSciMan/My-Coding-Stuff/', '_blank')}
		/>
	</nav>
	<slot />
</div>
