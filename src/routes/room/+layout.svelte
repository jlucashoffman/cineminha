<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    const roomId = $derived(page.params.id);

    onMount(() => {
        if (!roomId) goto("/")
    })
</script>