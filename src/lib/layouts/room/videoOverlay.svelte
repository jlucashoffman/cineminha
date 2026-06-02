<script lang="ts">
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
    import { replaceStreamTracks } from "$lib/utils/rtc";

    let {video}:{video:HTMLVideoElement} = $props();

    const changeWindow = async () => {
        if (controller.lobbyUserRole !== "host") return;
        
        try {
            const newStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: { ideal: 1920, max: 1920 },
                    height: { ideal: 1080, max: 1080 },
                    frameRate: { ideal: 30, max: 30 }
                },
                audio: true
            });

            if (media.stream) {
                media.stream.getTracks().forEach(track => track.stop());
            }

            media.stream = newStream;

            await replaceStreamTracks(newStream);

        } catch (err) {
            console.error("Erro ao trocar de janela:", err);
        }
    }

    const toggleFullscreen = () => {
        if (video) {
            if (!document.fullscreenElement) {
                video.requestFullscreen().catch(err => {
                    console.error(`Erro ao tentar ativar Fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    }
</script>

<div id="video_overlay">
    {#if controller.lobbyUserRole === "host"}
    <button id="toggle_stream" type="button" onclick={changeWindow}>swap</button>        
    {/if}
    <button id="fullscreen" type="button" onclick={toggleFullscreen}>fullscreen</button>
</div>

<style>
    #video_overlay {
        position: absolute;
        top: 0;
        left: 0;
        
        width: 100%;
        height: 100%;

        pointer-events: none;

        & button {
            pointer-events: all;
        }
    }
</style>