


export interface GetUserProfileType {
    id: String,
    role: String,
    profile: {
        displayName: String,
        bio: String,
        gender: String,
        avatarUrl: String,
        interests: [String]
    },
    friendProfile: {
        specialties: [String],
        isVerified: Boolean,
        averageRating: Float32Array,
        totalReviews: Int32Array,
        hourlyRate: Int32Array,
        perMinuteRate: Int32Array
        totalSessions: Int32Array
    }
}


export interface ProfileIF {
    id: String,
    name: String,
    avatar: String,
    bio: String,
    interests: [String],
    ratePerMinute: Int32Array,
    rating: Float32Array,
    totalSessions: Int32Array,
    specialties: [String]
}

export type SignalPayload = | { type: "join"; roomId: string }
    | { type: "offer"; sdp: RTCSessionDescriptionInit; roomId: string }
    | { type: "answer"; sdp: RTCSessionDescriptionInit; roomId: string }
    | { type: "candidate"; candidate: RTCIceCandidateInit; roomId: string }