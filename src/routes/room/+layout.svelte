<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { controller } from "$lib/types/store.svelte";
    import { onMount, type Snippet } from "svelte";

    let {children}:{children:Snippet} = $props();

    const roomId = $derived(page.params.id);

    onMount(() => {
        if (!roomId || !controller.roomCode || !controller.lobbyUserRole) goto("/")
    })

</script>

{@render children?.()}