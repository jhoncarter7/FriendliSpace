import React, { useEffect, useRef } from 'react'
import { useVideoCall } from '../hooks/useVideoCall'


export const VideoRoom: React.FC<{ roomId: string }> = ({ roomId }) => {
  const stream = useVideoCall(roomId)
  const videoRef = useRef<HTMLVideoElement>(null)
console.log("video call", roomId)
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full h-full bg-black"
    />
  )
}