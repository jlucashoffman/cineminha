<script lang="ts">
    import { controller } from "$lib/types/store.svelte";

    let name:string = $state("");

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        controller.userName = name;
    }
</script>

<div id="solicitate_name" class="border">
    <form onsubmit={handleSubmit}>
        <input type="text" placeholder="insert your name" bind:value={name}>
        <button type="submit">save</button>
    </form>
</div>

<style>
    #solicitate_name {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        border-radius: var(--space-md);
    }
</style>