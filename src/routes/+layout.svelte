<script lang="ts">
	import Nav from '$components/nav.svelte';
	import '../app.css';
</script>

<main class="bg-neutral-100 min-h-screen pb-4 text-neutral-500">
	<Nav />
	<slot />
</main>
