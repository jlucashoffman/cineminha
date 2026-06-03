<script lang="ts">
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
    import type { IWSMediaInfo } from "$lib/types/ws.svelte";

    let {ws}:{ws:WebSocket} = $props();

    let formData = $state({
        name: "",
        description: "",
        year: undefined,
        audio: undefined 
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        if (!formData.year || !formData.audio) return

        media.name = formData.name;
        media.description = formData.description;
        media.releaseYear = formData.year;
        media.audio = formData.audio;

        ws.send(JSON.stringify({
            action: 'info',
            name: media.name,
            description: media.description,
            year: media.releaseYear,
            audio: media.audio,
        } as IWSMediaInfo));

        controller.editVideoInfo = false;
    }
</script>

<div id="room_edit">
    <form onsubmit={handleSubmit}>
        <input type="text" name="name" placeholder="movie name" bind:value={formData.name}>
        <input type="text" name="description" placeholder="movie description" bind:value={formData.description}>
        <input type="number" name="year" placeholder="year" bind:value={formData.year}>
        <div id="movie_toggle_audio">
            <input type="radio" name="audio" id="room_creation_audio_dub" value="dub" bind:group={formData.audio}>
            <label for="room_creation_audio_dub">dublado</label>
            <input type="radio" name="audio" id="room_creation_audio_leg" value="leg" bind:group={formData.audio}>
            <label for="room_creation_audio_leg">legendado</label>
        </div>
        <button type="submit">edit room</button>
    </form>
</div>

<style>
    #room_edit {
        max-width: 256px;

        & form {
            align-items: flex-start;
            padding: 0px;
        }
    }
</style>