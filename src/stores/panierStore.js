import {defineStore} from "pinia";
import _ from "lodash";

const apiUrl = 'https://quick-diner.k-gouzien.fr'
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

                        if(localStorage.getItem("token")) {
                            await fetch(`${apiUrl}/api/user/panier`, {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                                },
                                body: JSON.stringify({id: produitInList.id, quantite: produitInList.quantity})
                            })
                        }
                    } else {
                        this.panier.splice(produitInList, 1)

                        if(localStorage.getItem("token")) {
                            await fetch(`${apiUrl}/api/user/panier/${produitInList.id}`, {
                                method: "DELETE",
                                headers : {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                        }

                    }
                }

        },
        async addProduit(produit) {

            let produitInList = this.panier.find(produitQuantity => produitQuantity.id === produit.id)

            if(produitInList !== undefined) {
                produitInList.quantity += 1
                if(localStorage.getItem("token")) {
                    await fetch(`${apiUrl}/api/user/panier`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({id: produitInList.id, quantite: produitInList.quantity})
                    })
                }
            } else {
                produit.quantity = 1
                console.log(produit)
                this.panier.push(produit)
                if(localStorage.getItem("token")) {
                    await fetch(`${apiUrl}/api/user/panier`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({id: produit.id, quantite: produit.quantity})
                    })
                }
            }
        },
        async clearPanier() {
            this.panier = []
            if(localStorage.getItem("token")) {
                await fetch(`${apiUrl}/api/user/panier/all`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
            }
        },
        async getPanierUserConnected() {
            // description
            //     :
            //     "Le meilleurs wrap que vous aurez jamais gouter de toutes votre vie (ou presque)"
            // id
            //     :
            //     7
            // image
            //     :
            //     "https://quick-diner.k-gouzien.fr/api/produits/7/image"
            // nom
            //     :
            //     "Mac Wrap"
            // prix
            //     :
            //     2
            // quantity
            //     :
            //     1
            if(localStorage.getItem("token")) {
                await fetch(`${apiUrl}/api/user/panier`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                }).then(async (result) => {
                    const panier = await result.json()

                    const listOfProduct = panier.produitPaniers

                    _.forEach(listOfProduct, product => {
                        this.panier.push({
                            description: product.produit.description,
                            id: product.produit.id,
                            nom: product.produit.nom,
                            image: product.produit.image,
                            prix: product.produit.prix,
                            quantity: product.quantite,
                        })
                    })

                    // listOfProduct.for(product => {
                    //     this.panier.add({
                    //         description: product.produit.description,
                    //         id: product.produit.id,
                    //         nom: product.produit.nom,
                    //         image: product.produit.image,
                    //         prix: product.produit.prix,
                    //         quantity: product.quantite,
                    //     })
                    // })
                })
            }
        }
    }
})

export {
    panierStore
}