"use client"
import { VideoRoom } from "@/app/components/VideoCall"
import { useParams } from "next/navigation"


export default function VideoPage() {
  const { roomId } = useParams<{ roomId: string }>()
  return (
    <div className="w-full h-screen">
        
      <VideoRoom roomId={roomId} />
    </div>
  )
}