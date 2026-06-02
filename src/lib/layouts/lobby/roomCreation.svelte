<script lang="ts">
    import { goto } from "$app/navigation";
    import { controller } from "$lib/types/store.svelte";
    import { media, type videoAudio } from "$lib/types/video.svelte";
    import generateCode from "$lib/utils/generateCode";

    let formData = $state({
        name: "",
        description: "",
        year: undefined,
        audio: undefined 
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        if (!formData.year || !formData.audio) return

        const code = generateCode();
        controller.roomCode = code;

        media.name = formData.name;
        media.description = formData.description;
        media.releaseYear = formData.year;
        media.audio = formData.audio;

        goto(`/room/${code}`);
    }
</script>

<div class="border user_role_config">
    <form id="room_creation" onsubmit={handleSubmit}>
        <p>add move details</p>
        <input type="text" name="name" placeholder="movie name" bind:value={formData.name}>
        <input type="text" name="description" placeholder="movie description" bind:value={formData.description}>
        <input type="number" name="year" placeholder="year" bind:value={formData.year}>
        <div id="movie_toggle_audio">
            <input type="radio" name="audio" id="room_creation_audio_dub" value="dub" bind:group={formData.audio}>
            <label for="room_creation_audio_dub">dublado</label>
            <input type="radio" name="audio" id="room_creation_audio_leg" value="leg" bind:group={formData.audio}>
            <label for="room_creation_audio_leg">legendado</label>
        </div>
        <button type="submit">create room</button>
    </form>
</div>