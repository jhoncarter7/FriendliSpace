


export interface GetUserProfileType{
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
    }
}