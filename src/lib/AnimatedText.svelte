<script lang="ts">
	import { goto } from "$app/navigation";

	export let text: string;
    export let targeturl: string ="";
</script>

{#if targeturl}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span class="cursor-pointer group" id="wrapper" on:click={() => goto(targeturl)}>
	{#each text.split('') as letter, i}
		<span
			class="inline-block group-hover:-translate-y-2 after:translate-y-2 transition-all duration-300 group-hover:text-sky-500 font-semibold"
			style="transition-delay: {i * 50}ms;">{letter}</span
		>
	{/each}
</span>
{:else}
<span class="cursor-pointer group" id="wrapper" >
	{#each text.split('') as letter, i}
		<span
			class="inline-block group-hover:-translate-y-2 after:translate-y-2 transition-all duration-300 group-hover:text-sky-500 font-semibold"
			style="transition-delay: {i * 50}ms;">{letter}</span
		>
	{/each}
</span>
{/if}
