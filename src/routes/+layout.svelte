<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="bg-[#FBF1C7] min-h-screen min-w-screen">
	<Header />

	<main class="w-full h-full">
		<slot />
	</main>
</div>
