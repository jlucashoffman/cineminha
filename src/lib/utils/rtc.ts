import { media } from "$lib/types/video.svelte";

const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

const peerConnections: Record<string, RTCPeerConnection> = {};

export const addPeerConnection = async (ws:WebSocket, guestId: string, myId: string) => {
    const pc = new RTCPeerConnection(rtcConfig);
    peerConnections[guestId] = pc;

    if (media.stream) media.stream.getTracks().forEach(track => pc.addTrack(track, media.stream!))

    pc.onicecandidate = (e) => {
        if (e.candidate) ws.send(JSON.stringify({
            action: 'ice',
            candidate: e.candidate,
            to: guestId,
            from: myId,
        }))
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer)

    ws.send(JSON.stringify({
        action: 'offer',
        sdp: offer,
        to: guestId,
        from: myId
    }))
}

export const acceptPeerConnection = async (ws:WebSocket, hostId:string, myId: string, sdp: RTCSessionDescriptionInit) => {
    const pc = new RTCPeerConnection(rtcConfig);
    peerConnections[hostId] = pc;

    pc.ontrack = (e) => media.stream = e.streams[0]

    pc.onicecandidate = (e) => {
        if (e.candidate) ws.send(JSON.stringify({
            action: 'ice',
            candidate: e.candidate,
            to: hostId,
            from: myId,
        }))
    }

    await pc.setRemoteDescription(new RTCSessionDescription(sdp))
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer)

    ws.send(JSON.stringify({
        action: 'answer',
        sdp: answer,
        to: hostId,
        from: myId
    }))
}

export const handshakePeerConnection = async (peerId:string, sdp: RTCSessionDescriptionInit) => {
    const pc = peerConnections[peerId];
    if (pc) await pc.setRemoteDescription(new RTCSessionDescription(sdp))
}

export const adoptPeerConnection = async (peerId:string, candidate: RTCIceCandidateInit) => {
    const pc = peerConnections[peerId];
    if (pc) await pc.addIceCandidate(new RTCIceCandidate(candidate))
}