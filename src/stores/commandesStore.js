import {defineStore} from "pinia";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

export const commandesStore = defineStore('commandesStore', {
    state : () => ({
        commandes : [],
        ws : null
    }),
    actions : {
        async getCommandes () {
            await fetch(`${apiUrl}/api/user/commandes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(async (result) => this.commandes = await result.json())
        },
        async getCommandesCommercant () {
            await fetch(`${apiUrl}/api/restaurants/commandes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(async (result) => {
                    this.commandes = await result.json()
                    if (this.ws === null) {
                        this.ws = new WebSocket(`ws://k-gouzien.fr:86/websocket/restaurants/commandes`)

                        this.ws.onmessage = (e) => {

                            if(!JSON.parse(e.data).Success && !JSON.parse(e.data).Error) {
                                this.commandes.push(JSON.parse(e.data))
                            }
                        }

                        this.ws.onopen = () => {
                            this.ws.send(JSON.stringify({token: `Bearer ${localStorage.getItem("token")}`}))
                        }

                        this.ws.onclose = () => {

                        }

                    }
                })
        },
        async sendCommande(panier) {
            await fetch(`${apiUrl}/api/user/commandes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body : JSON.stringify(panier)
            })
        },
        clearCommandes() {
            this.commandes = []
        }
    }
})