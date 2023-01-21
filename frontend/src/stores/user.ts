import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') || null,
    }),
    getters: {
        getToken: (state) => state.token,
        getUser: (state: any) => JSON.parse(state.user),
    },
    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.setItem('token', token)
        },
        removeToken() {
            this.token = null
            localStorage.removeItem('token')
        },
        setUser(user: string) {
            this.user = JSON.stringify(user)
            localStorage.setItem('user', this.user)
        },
        clearUser() {
            this.user = null
            localStorage.removeItem('user')
        },
    }
})
