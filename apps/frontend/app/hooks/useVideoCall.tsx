import { SignalPayload } from '@repo/common/types'
import { useEffect, useRef, useState } from 'react'




export function useVideoCall(roomId: string) {
  const pcRef = useRef<RTCPeerConnection | null>( null)
  const wsRef = useRef<WebSocket |null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream>()



  useEffect(() => {
    // 1) open WS and join room
    const host = window.location.hostname
    const wsPort = '8080'                       // ← your video-service port
    const scheme = location.protocol === 'https:' ? 'wss' : 'ws'
    const wsUrl = `${scheme}://${host}:${wsPort}`

    wsRef.current = new WebSocket(wsUrl)
    wsRef.current.onopen = () => {
      wsRef.current!.send(JSON.stringify({ type: 'join', roomId }))
    }

    // 2) setup peer connection
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    })
    pcRef.current = pc

    // 3) prepare a dedicated remote stream
    const remote = new MediaStream()
    setRemoteStream(remote)

    // 4) when negotiation is needed, create & send offer
    pc.onnegotiationneeded = async () => {
      try {
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        wsRef.current!.send(
          JSON.stringify({ type: 'offer', sdp: offer, roomId })
        )
      } catch (err) {
        console.error('negotiation failed', err)
      }
    }

    // 5) ICE candidates → WS
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        wsRef.current!.send(
          JSON.stringify({
            type: 'candidate',
            candidate: e.candidate.toJSON(),
            roomId
          } as SignalPayload)
        )
      }
    }

    // 6) incoming remote tracks → our remote MediaStream
    pc.ontrack = (e) => {
      remote.addTrack(e.track)
      setRemoteStream(remote)
    }

    // 7) fetch local media and add to PC
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream.getTracks().forEach((t) => pc.addTrack(t, stream))
      })
      .catch((err) => console.error('getUserMedia failed', err))

    // 8) handle incoming signaling messages
    wsRef.current.onmessage = async (evt) => {
      const msg: SignalPayload = JSON.parse(evt.data)
      switch (msg.type) {
        case 'offer':
          await pc.setRemoteDescription(msg.sdp)
          const answer = await pc.createAnswer()
          await pc.setLocalDescription(answer)
          wsRef.current!.send(
            JSON.stringify({ type: 'answer', sdp: answer, roomId })
          )
          break

        case 'answer':
          await pc.setRemoteDescription(msg.sdp)
          break

        case 'candidate':
          await pc.addIceCandidate(msg.candidate)
          break
      }
    }

    return () => {
      wsRef.current?.close()
      pc.close()
    }
  }, [roomId])

  return remoteStream
}