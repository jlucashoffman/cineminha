import type { userRole } from "./store.svelte"
import type { videoAudio } from "./video.svelte"

export type WSActions = "ping" | "pong"

export interface IWSConnection {
    action: "join",
    roomId: string,
}

export interface IWSHandshake {
    action: WSActions,
    role: userRole,
    name: string,
    userId: string,
}

export interface IWSCut {
    action: "bye",
    userId: string,
}

export interface IWSMediaInfo {
    action: "info",
    name: string,
    description: string,
    year: number,
    audio: videoAudio,
}