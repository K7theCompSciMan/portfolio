<script lang="ts">
	import Heading from '$lib/Heading.svelte';
	import src from '$lib/images/kesavan.jpeg';
	import Scrollbar from 'smooth-scrollbar';
	import { onMount } from 'svelte';
	onMount(() => {
		Scrollbar.init(document.querySelector('#scrollable')!, {
			damping: 0.1,
			thumbMinSize: 0,
			renderByPixels: true,
			alwaysShowTracks: false,
		});
	});
</script>

<div class="h-[94vh] text-slate-400 overflow-auto scroll-m-8 no-scrollbar::-webkit-scrollbar " id="scrollable">
	<br />
	hello
</div>
