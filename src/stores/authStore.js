import {defineStore} from "pinia";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const authStore = defineStore('authStore', {
    states : () => ({
        token : "",
        user : ""
    }),
    actions : {
        async register (user) {
            await fetch(`${apiUrl}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body : JSON.stringify(user)
            })
        },

        async authenticate (user) {
            await fetch(`${apiUrl}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body : JSON.stringify(user)
            }).then(async (result) => {
                if (result.status !== 400)  {
                    this.token = await result.text()
                    localStorage.setItem('token', this.token)
                    await this.reconnect()
                }
            })
        },
        async reconnect() {
            this.token = localStorage.getItem('token')
            const parts = this.token.split('.')
            const payload = JSON.parse(atob(parts[1]))
            this.user = JSON.parse(payload.sub).nom.toUpperCase() + ' ' + JSON.parse(payload.sub).prenom
        }
    }
})

export {
    authStore
}