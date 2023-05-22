import {defineStore} from "pinia";
import {authStore} from "@/stores/authStore";
import {round} from "lodash";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

export const restaurantsStore = defineStore('restaurantsStore', {
    state : () => ({
        restaurants : [],
        restaurant: {},
        filter: {name: "", avgPrice: null, note: 0},
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
                    this.filter.avgPrice = round(maxPrice)
                    this.maxPrice = round(maxPrice)

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
            console.log(this.restaurants)
            if(this.filter.avgPrice !== 0 || this.filter.name !== "" || this.filter.note !== 0) {
                return this.restaurants.filter(restaurant => {
                    const res = restaurant.restaurant
                    const nom = res.nom.toLowerCase()
                    const avgPrice = restaurant.prixMoyen
                    const note = restaurant.note

                    return (
                        (this.filter.avgPrice === 0 || avgPrice <= this.filter.avgPrice) &&
                        (this.filter.name === "" || nom.includes(this.filter.name.toLowerCase())) &&
                        (this.filter.note === 0 || note >= this.filter.note)
                    );

                })

            } else {
                return this.restaurants
            }
        }
    }
})