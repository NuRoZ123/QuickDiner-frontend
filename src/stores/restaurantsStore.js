import {defineStore} from "pinia";
import {authStore} from "@/stores/authStore";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

export const restaurantsStore = defineStore('restaurantsStore', {
    state : () => ({
        restaurants : [],
        restaurant: {},
        filter: {name: "", avgPrice: null},
        maxPrice: null
    }),
    actions : {
        async getRestaurants () {
            await fetch(`${apiUrl}/api/restaurants`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(async (result) => {
                    this.restaurants = await result.json()
                    const maxPrice = this.restaurants.reduce((max, objet) => (objet.prixMoyen > max) ? objet.prixMoyen : max, this.restaurants[0].prixMoyen)
                    this.filter.avgPrice = maxPrice
                    this.maxPrice = maxPrice

                })
        },
        async getRestaurant(idRestaurant) {
            await fetch(`${apiUrl}/api/restaurants/${idRestaurant}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
                .then(async (result) => this.restaurant = await result.json())
        },
        async updateRestaurant(restaurant) {
            await fetch(`${apiUrl}/api/restaurants`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(restaurant)
            }).then(async (result) => {
                if (result.status === 400) {
                    authStore().pushErrors("Veuillez compléter les champs")
                }

                if (result.status === 200) {
                    authStore().pushSuccess("Le restaurant à bien été modifier")
                }
                setTimeout(() => authStore().resetErrors(), 2000)
            })
        },
        filterRestaurant() {
            if(this.filter.avgPrice !== 0 || this.filter.name !== "") {
                return this.restaurants.filter(restaurant => {
                    const res = restaurant.restaurant
                    const nom = res.nom.toLowerCase()
                    const avgPrice = restaurant.prixMoyen

                    if(this.filter.avgPrice !== 0 && this.filter.name !== "") {
                        return nom.includes(this.filter.name.toLowerCase()) && avgPrice <= this.filter.avgPrice
                    }

                    else if (this.filter.avgPrice !== 0 && this.filter.name === "") {
                        return avgPrice <= this.filter.avgPrice
                    }

                    else if (this.filter.avgPrice === 0 && this.filter.name !== "") {
                        return nom.includes(this.filter.name.toLowerCase())
                    }

                })

            } else {
                return this.restaurants
            }
        }
    }
})