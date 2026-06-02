export type videoAudio = "leg" | "dub";

class VideoMedia {
    name: string = $state("");
    description: string = $state("");
    audio?: videoAudio = $state();
    releaseYear?: number = $state();
    stream?:MediaStream = $state();
}

export const media = new VideoMedia();