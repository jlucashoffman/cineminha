import type { IWSCut } from "$lib/types/ws.svelte";

const screamCut = (ws: WebSocket, id: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            action: 'bye',
            userId: id
        } as IWSCut));
    }
}

export default screamCut;