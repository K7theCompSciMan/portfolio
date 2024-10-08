<script>
	import { goto } from "$app/navigation";


	import Button from "$lib/Button.svelte";
	import { onMount } from "svelte";
	let selectedPage = 'projects';
	onMount(() => {
		selectedPage = window.location.pathname.split('/')[2];
	})
	$: console.log(selectedPage)
</script>
<div class="max-h-screen justify-center text-center bg-slate-800 relative overflow-auto">
	<div class="relative flex flex-row opacity-100 scale-100 transition-all duration-100 bg-slate-800 shadow-xl top-[5%] w-full py-[1%] rounded-xl justify-center">
		<Button name="Programming Projects" onclick={() => {window.location.pathname='/projects/programming'; selectedPage = "programming"}} more=" {selectedPage === "programming" ? "border-b-[1px] scale-[1.6]" : ""} scale-150 hover:scale-[1.6] hover:border-b-[1px] border-sky-500 overflow-auto mr-[8%]" textColor={selectedPage === "programming" ? "text-sky-500" : "text-slate-400"}></Button>
		<Button name="Engineering Projects" onclick={() => {window.location.pathname='/projects/engineering'; selectedPage = "engineering"}} more=" {selectedPage === "engineering" ? "border-b-[1px] scale-[1.6]" : ""} scale-150 hover:scale-[1.6] hover:border-b-[1px] border-sky-500 overflow-auto" textColor={selectedPage === "engineering" ? "text-sky-500" : "text-slate-400"}></Button>
	</div>
	<slot />
</div>