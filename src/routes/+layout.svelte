<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/reset.css';
	import '$lib/styles/neoreset.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/main.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
