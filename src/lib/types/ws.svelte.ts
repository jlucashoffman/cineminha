import type { userRole } from "./store.svelte"

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