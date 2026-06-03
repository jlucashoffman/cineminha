<script lang="ts">
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
    import VideoOverlay from "./videoOverlay.svelte";

    // svelte-ignore non_reactive_update
    let video:HTMLVideoElement;
</script>

<section id="video_player">
    {#if media.stream}
    <VideoOverlay {video} />
    <video
    bind:this={video} 
    autoplay
    playsinline
    controls
    muted={controller.lobbyUserRole === "host"}
    srcobject={media.stream}></video>
    {/if}
</section>

<style>
    #video_player {
        display: block;

        width: 100%;
        height: 100%;

        background-color: rgb(27, 27, 27);

        position: relative;

        & video {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
</style>