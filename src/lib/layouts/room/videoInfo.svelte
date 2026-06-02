<script lang="ts">
    import { media } from "$lib/types/video.svelte";
</script>

<section id="video_info" class="border">
    <div id="video_labels">
        <p>{media.releaseYear}</p>
        <p>{media.audio}</p>
    </div>
    <h1>{media.name}</h1>
    <p>{media.description}</p>
</section>

<style>
    #video_info {
        border-radius: var(--space-md);
        box-sizing: border-box;
        padding: var(--space-md);

        height: 100%;

        display: flex;
        flex-direction: column;
        gap: var(--space-md);

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