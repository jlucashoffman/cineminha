<script lang="ts">
    import { PUBLIC_SERVER_PROTOCOL, PUBLIC_SERVER_IP } from "$env/static/public";
    import VideoInfo from "$lib/layouts/room/videoInfo.svelte";
    import VideoPlayer from "$lib/layouts/room/videoPlayer.svelte";
    import ViewersList from "$lib/layouts/room/viewersList.svelte";
    import { controller } from "$lib/types/store.svelte";
    import { media } from "$lib/types/video.svelte";
    import type { IWSConnection, IWSHandshake, IWSMediaInfo } from "$lib/types/ws.svelte";
    import { acceptPeerConnection, addPeerConnection, adoptPeerConnection, handshakePeerConnection, replaceStreamTracks } from "$lib/utils/rtc";
    import screamCut from "$lib/utils/screamCutWS";
    import { onDestroy, onMount } from "svelte";

    const myId = crypto.randomUUID();

    // svelte-ignore non_reactive_update
    let ws:WebSocket;

    const handleUnload = () => screamCut(ws, myId);

    onMount(async () => {        
        if (controller.lobbyUserRole === "host") {
            try {
                media.stream = await navigator.mediaDevices.getDisplayMedia({ 
                    video: {
                        width: { ideal: 1280, max: 1920 },
                        height: { ideal: 720, max: 1080 },
                        frameRate: { ideal: 24, max: 24 }
                    }, 
                    audio: true 
                });
            } catch (err) {
                console.error("Host recusou compartilhar a tela", err);
            }
        }
        ws = new WebSocket(`${PUBLIC_SERVER_PROTOCOL}://${PUBLIC_SERVER_IP}`);

        window.addEventListener("beforeunload", handleUnload)

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

            if(data.userId === myId || data.from === myId) return;
            
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

            // --- LÓGICA DO WEBRTC ---
        
            // Host inicia a ligação quando um Guest dá Ping
            if (data.action === "ping" && controller.lobbyUserRole === "host" && data.role === "guest") {
                addPeerConnection(ws, data.userId, myId);
            }

            // Guest atende a ligação do Host
            if (data.action === "offer" && data.to === myId && controller.lobbyUserRole === "guest") {
                acceptPeerConnection(ws, data.from, myId, data.sdp);
            }

            // Host confirma a resposta do Guest
            if (data.action === "answer" && data.to === myId && controller.lobbyUserRole === "host") {
                handshakePeerConnection(data.from, data.sdp);
            }

            // Ambos processam as rotas de rede
            if (data.action === "ice" && data.to === myId) {
                adoptPeerConnection(data.from, data.candidate);
            }
        };

        ws.onclose = () => {
            console.log('desconectado');
        };
    })

    onDestroy(() => {
        window.removeEventListener("beforeunload", handleUnload);
        screamCut(ws, myId);
        if (ws) ws.close();
    });
</script>

<main>
    <ViewersList />
    <div id="interactive_content">
        <VideoPlayer />
    </div>
    <VideoInfo {ws} />
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

        & #interactive_content {
            display: flex;
            flex-direction: column;
            gap: 16px;

            flex: 1;
        }
    }
</style>