<script lang="ts">
    import CodeSolicitation from "$lib/layouts/lobby/codeSolicitation.svelte";
    import RoomCreation from "$lib/layouts/lobby/roomCreation.svelte";
    import UserRoleSelection from "$lib/layouts/lobby/userRoleSelection.svelte";
    import { controller } from "$lib/types/store.svelte";
</script>

<main>
    <div>
        <UserRoleSelection />
        {#if controller.lobbyUserRole == "guest"}
        <CodeSolicitation /> {/if}
        {#if controller.lobbyUserRole == "host"}
        <RoomCreation /> {/if}
    </div>
</main>

<style>
    main {
        max-width: 1440px;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 auto;

        & div { 
            position: relative; 

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & :global(.user_role_config) {
                position: absolute;
                top: calc(100% + 16px);
            }
        }
    }
</style>