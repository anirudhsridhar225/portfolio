<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="bg-[#E5DFC5] min-h-screen min-w-screen">
	<Header />

	<main class="h-[90vh] w-full flex items-center justify-center">
		<slot />
	</main>
</div>
