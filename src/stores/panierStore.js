import {defineStore} from "pinia";

// const apiUrl = 'https://quick-diner.k-gouzien.fr'

const panierStore = defineStore("panierStore", {
    state : () => ({
        panier : []
    }),
    actions : {
        async removeProduitId(idProduit) {
                const produitInList = this.panier.find(menu => menu.id === idProduit)
                if(produitInList) {
                    if (produitInList.quantity > 1) {
                        produitInList.quantity -= 1
                    } else {
                        this.panier.splice(produitInList, 1)
                    }
                }

        },
        async addProduit(produit) {

            let produitInList = this.panier.find(produitQuantity => produitQuantity.id === produit.id)

            if(produitInList !== undefined) {
                produitInList.quantity += 1
            } else {
                produit.quantity = 1
                this.panier.push(produit)
            }
        },
        async clearPanier() {
            this.panier = []
        }
    }
})

export {
    panierStore
}