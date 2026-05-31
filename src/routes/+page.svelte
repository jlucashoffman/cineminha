<script lang="ts">
    import CodeSolicitation from "$lib/layouts/lobby/codeSolicitation.svelte";
    import RoomCreation from "$lib/layouts/lobby/roomCreation.svelte";
    import UserRoleSelection from "$lib/layouts/lobby/userRoleSelection.svelte";
    import { controller } from "$lib/types/store.svelte";
</script>

<main>
    <UserRoleSelection />
    {#if controller.lobbyUserRole == "guest"}
    <CodeSolicitation /> {/if}
    {#if controller.lobbyUserRole == "host"}
    <RoomCreation /> {/if}
</main>