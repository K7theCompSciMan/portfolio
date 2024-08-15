<script lang="ts">
	export let name = 'Home';
	export let onclick = () => {};
	export let more = "";
</script>

<button
	class="text-slate-400 flex flex-row hover:text-sky-500 transition-all duration-[50ms] hover:scale-[1.05] {more}"
	on:click={onclick}
>
	{#if name === 'Home'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 mr-1"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
			/>
		</svg>
	{:else if name === 'My Projects'}
		<svg
			data-slot="icon"
			fill="none"
			stroke-width="1.5"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="size-6 mr-1"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
			></path>
		</svg>
	{:else if name === 'About Me'}
		<svg
			data-slot="icon"
			fill="none"
			stroke-width="1.5"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="size-6 mr-1"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
			></path>
		</svg>
	{/if}
	<p>
		{name}
	</p>
</button>
