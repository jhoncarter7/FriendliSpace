
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const Api = {
    SIGNIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER_SEEKER: `${API_BASE_URL}/api/auth/register/seeker`,
    REGISTER_FRIEND: `${API_BASE_URL}/api/auth/register/friend`
}