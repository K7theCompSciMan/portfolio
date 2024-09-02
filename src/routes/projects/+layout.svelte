<script>
	import { goto } from "$app/navigation";


	import Button from "$lib/Button.svelte";
	import { onMount } from "svelte";
	let selectedPage = '';
	onMount(() => {
		selectedPage = window.location.pathname.split('/')[1];
	})
	$: console.log(selectedPage)
</script>
<div class="max-h-screen justify-center text-center bg-slate-800 relative">
	<div class="relative flex flex-row opacity-100 scale-100 transition-all duration-100 bg-slate-800 shadow-xl top-[5%] w-full py-[1%] rounded-xl justify-center">
		<Button name="Engineering Projects" onclick={() => {goto('/projects/engineering'); selectedPage = "Engineering"}} more=" {selectedPage === "Engineering" ? "border-b-[1px] scale-[1.6] text-sky-500" : ""} scale-150 hover:scale-[1.6] hover:border-b-[1px] border-sky-500 overflow-auto mr-[8%]"></Button>
		<Button name="Programming Projects" onclick={() => {goto('/projects/programming'); selectedPage = "Programming"}} more=" {selectedPage === "Programming" ? "border-b-[1px] scale-[1.6] text-sky-500" : ""} scale-150 hover:scale-[1.6] hover:border-b-[1px] border-sky-500 overflow-auto"></Button>
	</div>
	<slot />
</div>