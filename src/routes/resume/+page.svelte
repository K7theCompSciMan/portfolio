<script>
	import Heading from '$lib/Heading.svelte';
	import resume from '$lib/Rangarajan_Kesavan_Resume.pdf';
</script>

<div class="text-black" style="height: 92.7vh;">
	<Heading text="Resume" />
	<p class="pt-3">If you want to download the resume, download it <a href={resume} download> <u class="text-blue-500">here</u> </a></p>

	<embed
		src={resume}
		type="application/pdf"
		width="50%"
		height="93%"
		class="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
	/>
</div>
