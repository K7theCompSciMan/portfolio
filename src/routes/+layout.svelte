<script lang="ts">
	import '../app.postcss';
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="max-h-screen justify-center text-center bg-slate-800">
	<nav
		class="h-[6vh] border-b-[1px] border-slate-500 flex-row flex justify-center align-middle items-center"
	>
		<div class="w-[41%] text-slate-500 flex-row flex pl-2">
			<button class="w-fit h-fit hover:text-sky-500 transition-all duration-[50ms] hover:scale-105" on:click={() => window.open('https://github.com/K7theCompSciMan/', '_blank')}>
				<svg
					class="pb-0.5"
					xmlns="http://www.w3.org/2000/svg"
					width="35"
					height="35"
					viewBox="0 0 16 16"
					fill="currentColor"
					stroke="currentColor"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8 1.4978C4.31667 1.4978 1.33334 4.48114 1.33334 8.16447C1.33334 11.1145 3.24167 13.6061 5.89167 14.4895C6.225 14.5478 6.35 14.3478 6.35 14.1728C6.35 14.0145 6.34167 13.4895 6.34167 12.9311C4.66667 13.2395 4.23334 12.5228 4.1 12.1478C4.025 11.9561 3.7 11.3645 3.41667 11.2061C3.18334 11.0811 2.85 10.7728 3.40834 10.7645C3.93334 10.7561 4.30834 11.2478 4.43334 11.4478C5.03334 12.4561 5.99167 12.1728 6.375 11.9978C6.43334 11.5645 6.60834 11.2728 6.8 11.1061C5.31667 10.9395 3.76667 10.3645 3.76667 7.81447C3.76667 7.08947 4.025 6.48947 4.45 6.0228C4.38334 5.85614 4.15 5.1728 4.51667 4.25614C4.51667 4.25614 5.075 4.08114 6.35 4.93947C6.88334 4.78947 7.45 4.71447 8.01667 4.71447C8.58334 4.71447 9.15 4.78947 9.68334 4.93947C10.9583 4.0728 11.5167 4.25614 11.5167 4.25614C11.8833 5.1728 11.65 5.85614 11.5833 6.0228C12.0083 6.48947 12.2667 7.08114 12.2667 7.81447C12.2667 10.3728 10.7083 10.9395 9.225 11.1061C9.46667 11.3145 9.675 11.7145 9.675 12.3395C9.675 13.2311 9.66667 13.9478 9.66667 14.1728C9.66667 14.3478 9.79167 14.5561 10.125 14.4895C11.4485 14.0427 12.5985 13.1921 13.4132 12.0575C14.2279 10.9229 14.6663 9.56131 14.6667 8.16447C14.6667 4.48114 11.6833 1.4978 8 1.4978Z"
						fill="#0E100F"
					></path></svg
				>
			</button>
		</div>
		<div
			class="rounded-3xl border-[1px] border-slate-500 w-[18%] h-[70%] flex-row flex align-middle justify-center items-center text-sm"
		>
			<Button name="Home" onclick={() => goto('/')} more="mr-4"></Button>
			<Button name="My Projects" onclick={() => goto('/projects')} more="mr-4"></Button>
			<Button name="About Me" onclick={() => goto('/about-me')}></Button>
		</div>
		<div class="w-[41%]"></div>
	</nav>
	<slot />
</div>
