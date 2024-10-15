<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="bg-[#E5DFC5] min-h-screen">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="w-full text-center bg-[#B9C0AB] p-4">
		<p class=" text-xl font-semibold">(somehow) made by andy</p>
	</footer>
</div>
