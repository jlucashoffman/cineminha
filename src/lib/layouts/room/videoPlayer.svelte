<script lang="ts">
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
</script>

<section id="video_player">
    {#if media.stream}
    <video 
    autoplay
    playsinline
    muted={controller.lobbyUserRole === "host"}
    style="width: 100%;"
    srcobject={media.stream}></video>
    {/if}
</section>

<style>
    #video_player {
        display: block;
        aspect-ratio: 16/9;
        width: 100%;
        background-color: rgb(27, 27, 27);
    }
</style>