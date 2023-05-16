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
                .then(async (result) => {
                    this.commandes = await result.json()
                    this.commandes.forEach(commands => {
                        commands.completed = true
                        commands.produitsCommander.forEach(produit => {
                            if (produit.etat === "En cours") {
                                commands.completed = false
                            }
                        })

                    })
                })
                .then(() => {
                    this.ws = null
                    if (this.ws === null) {
                        this.ws = new WebSocket(`ws://k-gouzien.fr:86/websocket/user/commandes`)

                        this.ws.onmessage = (e) => {

                            if(!JSON.parse(e.data).Success && !JSON.parse(e.data).Error) {
                                const commandeUpdate = JSON.parse(e.data)
                                if (commandeUpdate.message) {
                                    this.commandes.forEach(command => {
                                        if(command.id === commandeUpdate.id) {
                                            command.completed = true
                                        }
                                    })
                                }
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
                this.commandes.forEach(commands => {
                    commands.completed = true
                    commands.produitsCommander.forEach(produit => {
                        if (produit.etat === "En cours") {
                            commands.completed = false
                        }
                    })

                })
            })
                .then(() => {
                    this.ws = null
                    if (this.ws === null) {
                        this.ws = new WebSocket(`ws://k-gouzien.fr:86/websocket/restaurants/commandes`)

                        this.ws.onmessage = (e) => {
                            this.commandes.push(JSON.parse(e.data))
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
            }).then(
                () => {
                    console.log(panier)
                    console.log(this.commandes[0])
                }
            )
        },
        clearCommandes() {
            this.commandes = []
        },
        clearWs () {
            this.ws = null
        },
        async updateCommandes(id) {
            await fetch(`${apiUrl}/api/user/commandes/${id}/termine`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(() =>
                this.commandes.forEach(command => {
                    if(command.id === id) {
                        command.completed = true
                    }
                })
            )
        }
    }
})