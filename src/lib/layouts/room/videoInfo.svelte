<script lang="ts">
    import { media } from "$lib/types/video.svelte";

</script>
<section id="video_info">
    <p>{media.name}</p>
    <p>{media.description}</p>
    <p>{media.audio}</p>
    <p>{media.releaseYear}</p>
</section>