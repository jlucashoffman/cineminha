<script lang="ts">
    import { PUBLIC_SERVER_IP, PUBLIC_SERVER_PORT } from "$env/static/public";
    import VideoInfo from "$lib/layouts/room/videoInfo.svelte";
    import ViewersList from "$lib/layouts/room/viewersList.svelte";
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
    import type { IWSConnection, IWSHandshake, IWSMediaInfo } from "$lib/types/ws.svelte";
    import screamCut from "$lib/utils/screamCutWS";
    import { onDestroy, onMount } from "svelte";

    const myId = crypto.randomUUID();

    let ws:WebSocket;

    onMount(() => {        
        ws = new WebSocket(`ws://${PUBLIC_SERVER_IP}:${PUBLIC_SERVER_PORT}`);

        window.addEventListener("beforeunload", () => screamCut(ws, myId))

        ws.onopen = () => {
            ws.send(JSON.stringify({
                action: 'join',
                roomId: controller.roomCode
            } as IWSConnection));

            setTimeout(() => {
                if(!controller.userName || !controller.lobbyUserRole) return

                ws.send(JSON.stringify({
                    action: 'ping',
                    role: controller.lobbyUserRole,
                    name: controller.userName,
                    userId: myId,
                } as IWSHandshake));

                controller.viewers = [{id: myId, name: controller.userName, role: controller.lobbyUserRole}]
            }, 500);
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if(data.userId === myId) return;
            
            if (data.action === "ping") {
                if (!controller.viewers.find(v => v.id === data.userId)) {
                    controller.viewers = [...controller.viewers, {id: data.userId, name: data.name, role: data.role}];
                }

                ws.send(JSON.stringify({
                    action: 'pong',
                    role: controller.lobbyUserRole,
                    name: controller.userName,
                    userId: myId
                } as IWSHandshake));

                if(controller.lobbyUserRole === "host") {
                    ws.send(JSON.stringify({
                        action: 'info',
                        name: media.name,
                        description: media.description,
                        year: media.releaseYear,
                        audio: media.audio,
                    } as IWSMediaInfo));
                }
            }

            if (data.action === "pong") {
                if (!controller.viewers.find(v => v.id === data.userId)) {
                    controller.viewers = [...controller.viewers, {id: data.userId, name: data.name, role: data.role}]
                }
            }

            if (data.action === "bye") {
                controller.viewers = controller.viewers.filter((v) => v.id !== data.userId);
            }

            if (data.action === "info") {
                media.name = data.name;
                media.description = data.description;
                media.releaseYear = data.year;
                media.audio = data.audio;
            }
        };

        ws.onclose = () => {
            ws.send(JSON.stringify({
                action: 'bye',
                role: controller.lobbyUserRole,
                name: controller.userName,
                userId: myId
            }))
            console.log('desconectado');
        };
    })

    onDestroy(() => {
        window.removeEventListener("beforeunload", () => screamCut(ws, myId))
        if (ws) ws.close();
    });
</script>

<main>
    <ViewersList />
    <VideoInfo />
</main>

<style>
    main {
        display: flex;
        gap: 16px;

        width: calc(100% - 32px);
        height: calc(100% - 32px);

        position: absolute;
        top: 16px;
        left: 16px;
    }
</style>