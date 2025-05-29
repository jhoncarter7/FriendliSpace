import { WebSocketServer, WebSocket as WSWebSocket } from "ws"
import { SignalPayload } from "@repo/common/types"


const wss = new WebSocketServer({ host: '0.0.0.0', port: 8080 })
const rooms = new Map<string, Set<WSWebSocket>>();

wss.on("connection", (ws: WSWebSocket) => {
    let roomId: string | null = null;

    ws.on("message", (data) => {
        let msg: SignalPayload
        try {
            msg = JSON.parse(data.toString())
        } catch (error) {
            console.log(error)
            return;
        }

        if (msg.type === 'join') {
            roomId = msg.roomId
            const peers = rooms.get(roomId) ?? new Set()
            peers.add(ws)
            rooms.set(roomId, peers)
            return
        }

        console.log("rooms", rooms)
        if (!roomId) return

        for (const peer of rooms.get(roomId)!) {
            if (peer !== ws && peer.readyState === WebSocket.OPEN) {
                peer.send(JSON.stringify(msg))
            }
        }

    })

    ws.on('close', () => {
        if (!roomId) return
        const peers = rooms.get(roomId)!
        peers.delete(ws)
        if (peers.size === 0) rooms.delete(roomId)
    })

})

console.log('🚀 WebSocket video-service listening on ws://localhost:8080')