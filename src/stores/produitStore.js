import {defineStore} from "pinia";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const produitStore = defineStore("produitStore", {
    state : () => ({
        produits : [],
        restaurantOwn: {id:0}
    }),
    actions : {
        async getOwnRestaurant() {
            await fetch(`${apiUrl}/api/restaurants/own`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(async (result) => this.restaurantOwn = await result.json())
        },
        async getAllProduits() {
            await this.getOwnRestaurant().then(async () => {
                await fetch(`${apiUrl}/api/produits/${this.restaurantOwn.id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }).then(async (result) => this.produits = await result.json())
            })
        },
        async addProduit(produit) {
            await fetch(`${apiUrl}/api/produits`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify([produit])
            }).then(async () => this.produits.push(produit))
        },
        async deleteProduit(idProduit) {
            await fetch(`${apiUrl}/api/produits/${idProduit}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(
                () => {
                    const deletingProduit = this.produits.findIndex(produit => produit.id === idProduit)
                    this.produits.splice(deletingProduit, 1)
                }
            )
        },
        async modifyProduit(produit) {
            console.log(produit)
            await fetch(`${apiUrl}/api/produits`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(produit)
            }).then(
                () => {
                    const deletingProduit = this.produits.findIndex(produitBefore => produitBefore.id === produit.id)
                    this.produits[deletingProduit] = produit
                }
            )
        },
        clearRestaurantOwn() {
            this.restaurantOwn = {id:0}
        }
    }
})

export {
    produitStore
}