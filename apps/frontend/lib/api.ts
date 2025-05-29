
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const Api = {
    me: `${API_BASE_URL}/api/auth/me`,
    SIGNIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER_SEEKER: `${API_BASE_URL}/api/auth/register/seeker`,
    REGISTER_FRIEND: `${API_BASE_URL}/api/auth/register/friend`,
    FRIENDLIST: `${API_BASE_URL}/api/friends`,
    GETCURRENTUSERPROFILE: `${API_BASE_URL}/api/users/me`,
    UPDATECURRENTUSERPROFILE: `${API_BASE_URL}/api/users/me/profile`,
    UPDATEFRIENDPROFILE: `${API_BASE_URL}/api/friends/me/details`,
    GETUSERPROFILEBYID: `${API_BASE_URL}/api/users`,
    GET_SESSIONS: `${API_BASE_URL}/api/sessions`,
    CREATE_SESSION: `${API_BASE_URL}/api/sessions`,
}
