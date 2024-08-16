<script>
	export let content = 'Tooltip content';
	export let id = 'tooltip-default';
</script>

<div
	{id}
	role="tooltip"
	class="absolute invisible inline-block px-2 py-2 text-xs font-medium text-current transition-opacity duration-300 bg-gray-700 rounded-lg shadow-sm opacity-0 tooltip"
>
	{content}
	<div class="tooltip-arrow" data-popper-arrow></div>
</div>
