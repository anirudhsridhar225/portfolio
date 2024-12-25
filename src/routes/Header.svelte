<script>
	import github from '$lib/images/github.svg';
	import logo from '$lib/images/svelte-logo.svg';
</script>

<header class="flex justify-between">
	<div class="m-4">
		<a href="https://kit.svelte.dev" class="flex items-center justify-center w-full h-full">
			<img src={logo} alt="SvelteKit" class="w-8 h-8 object-contain" />
		</a>
	</div>

	<div class="m-4">
		<a href="https://github.com/shotoyaar" target="flex items-center justify-center w-full h-full">
			<img src={github} alt="GitHub" class="w-8 h-8 object-contain" />
		</a>
	</div>
</header>