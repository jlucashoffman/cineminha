<form id="room_creation">
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