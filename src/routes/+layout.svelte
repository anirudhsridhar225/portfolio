<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="w-full text-center bg-white p-6">
		<p class=" text-xl font-semibold">(somehow) made by andy</p>
	</footer>
</div>
