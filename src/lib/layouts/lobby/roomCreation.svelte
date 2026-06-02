<script lang="ts">
    import { goto } from "$app/navigation";
    import { controller } from "$lib/types/store.svelte";
    import generateCode from "$lib/utils/generateCode";

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        const code = generateCode();
        controller.roomCode = code;

        goto(`/room/${code}`);
    }
</script>

<div class="border user_role_config">
    <form id="room_creation" onsubmit={handleSubmit}>
        <p>add move details</p>
        <input type="text" name="name" placeholder="movie name">
        <input type="text" name="description" placeholder="movie description">
        <input type="number" name="year" placeholder="year">
        <div id="movie_toggle_audio">
            <input type="radio" name="audio" id="room_creation_audio_dub" value="dub">
            <label for="room_creation_audio_dub">dublado</label>
            <input type="radio" name="audio" id="room_creation_audio_leg" value="leg">
            <label for="room_creation_audio_leg">legendado</label>
        </div>
        <button type="submit">create room</button>
    </form>
</div>