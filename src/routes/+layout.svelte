<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/reset.css';
	import '$lib/styles/neoreset.css';
	import '$lib/styles/fonts.css';
	import '$lib/styles/variables.css';
	import '$lib/styles/main.css';
    import { controller } from '$lib/types/store.svelte';
    import SolicitateName from '$lib/layouts/solicitateName.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if controller.userName === ""}
<SolicitateName />
{:else}
{@render children()}
{/if}
