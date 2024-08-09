<script lang="ts">
	export let name = 'Home';
        export let onclick=()=>{};
</script>

<button class="p-2 m-2 rounded-md border-gray-300 border-8 bg-sky-400 w-64 hover:border-gray-400 hover:bg-sky-500 transition" style="transition-delay: 50ms" on:click={() => onclick()}
	>{name}</button
>
