<script>
	export let content = 'Tooltip content';
	export let id = 'tooltip-default';
	export let tooltip_placement = 'w-[60%] -top-[30%] -right-[25%]';
	export let arrow = true;
	export let button_placement = "";
	export let button_content =
		'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" > <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /> </svg>';
</script>

<div class="group">
	<div
		{id}
		class="absolute inline-block px-2 py-2 text-xs font-medium text-current transition-opacity duration-300 bg-gray-700 rounded-lg shadow-md opacity-0 group-hover:opacity-100 {tooltip_placement}"
	>
		{content}
	</div>
	{#if arrow}
	<div>
		<svg
			data-slot="icon"
			fill="none"
			stroke-width="1.5"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="size-6 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-[0.75] -right-0 "
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"
			></path>
		</svg>
	</div>
	{/if}
	<button
		class="w-fit h-fit mt-4 ml-1 hover:text-sky-500 transition-all duration-75 {button_placement}"
		type="button"
	>
		{@html button_content}
	</button>
</div>
