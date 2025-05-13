import { Store } from '@tanstack/react-store'


export interface UserIF {
    id: string, name: string, role: string
}
interface AuthStateIF {
    isAuthenticated: boolean,
    user: UserIF | null,

    login: (user: UserIF) => void,
    logout: () => void
}

export const authStore = new Store<AuthStateIF>({
    isAuthenticated: false,
    user: null,

    login(user: UserIF) {
        authStore.setState((prevState) => ({
            ...prevState,
            isAuthenticated: true,
            user

        }));
    },
    logout() {
        authStore.setState((prevState) => ({
            ...prevState,
            isAuthenticated: false,
            user: null
        }));
    }
})