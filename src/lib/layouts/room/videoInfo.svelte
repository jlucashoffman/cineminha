<script lang="ts">
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
    import RoomEdit from "./roomEdit.svelte";

    let {ws}:{ws:WebSocket} = $props();
</script>

<section id="video_info" class="border">
    {#if controller.lobbyUserRole === "host"}
    <button type="button" onclick={() => controller.editVideoInfo = !controller.editVideoInfo}>change movie</button>
    {/if}

    {#if controller.lobbyUserRole === "host" && controller.editVideoInfo}
    <RoomEdit {ws} />
    {:else}
    <div id="video_labels">
        <p>{media.releaseYear}</p>
        <p>{media.audio}</p>
    </div>
    <h1>{media.name}</h1>
    <p>{media.description}</p>
    {/if}
    
</section>

<style>
    #video_info {
        border-radius: var(--space-md);
        box-sizing: border-box;
        padding: var(--space-md);

        max-width: 256px;
        height: 100%;

        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--space-md);

        & button {
            width: fit-content;
            border-radius: var(--space-xs);
        }

        & #video_labels {
            display: flex;
            gap: var(--space-md);
            align-items: center;

            & p {
                text-transform: uppercase;
                font-size: 0.8rem;
                opacity: 0.4;
            }
        }

        & h1 {
            font-size: 2rem;
            font-weight: bold;
        }

        & > p {
            opacity: 0.8;
        }
    }
</style>