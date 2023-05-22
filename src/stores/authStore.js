import {defineStore} from "pinia";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const authStore = defineStore('authStore', {
    state : () => ({
        token : "",
        user : "",
        typeOfAccount: [],
        errors : [],
        success : [],
        role : ""
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
            }).then(async (result) => {
                if (result.status === 400)  {
                    this.pushErrors(await result.text())
                    return false
                }
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
                } else {
                    this.pushErrors("Identifiants incorrectes")
                }
            })
        },
        async reconnect() {
            this.token = localStorage.getItem('token')
            const parts = this.token.split('.')
            const payload = JSON.parse(atob(parts[1]))
            this.user = JSON.parse(payload.sub).nom.toUpperCase() + ' ' + JSON.parse(payload.sub).prenom
            this.role = JSON.parse(payload.sub).role
        },
        async updateUser(user) {
            await fetch(`${apiUrl}/api/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' : `Bearer ${this.token}`
                },
                body : JSON.stringify(user)
            }).then(async (result) => {
                if (result.status !== 400)  {
                    this.token = await result.text()
                    authStore().pushSuccess("Le compte à bien été modifier")
                    setTimeout(() => authStore().resetErrors(), 2000)
                    localStorage.setItem('token', this.token)
                    await this.reconnect()
                }
            })
        },
        async deleteAccount() {
            await fetch(`${apiUrl}/api/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' : `Bearer ${this.token}`
                }
            })
            this.token = ""
            localStorage.clear()
        },

        async getTypeOfAccount() {
            await fetch(`${apiUrl}/api/user/types`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async (response) => this.typeOfAccount = await response.json())
        },
        pushErrors(err) {
            this.errors.push(err)
        },
        pushSuccess(success) {
            this.success.push(success)
        },
        resetErrors() {
            this.errors = []
            this.success = []
        }
    }
})

export {
    authStore
}