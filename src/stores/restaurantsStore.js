import {defineStore} from "pinia";
import {authStore} from "@/stores/authStore";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

export const restaurantsStore = defineStore('restaurantsStore', {
    state : () => ({
        restaurants : [],
        restaurant: {},
        filter: ""
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
                .then(async (result) => this.restaurants = await result.json())
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
            if(this.filter) {
                return this.restaurants.filter(restaurant => restaurant.restaurant.nom.toLowerCase().includes(this.filter.toLowerCase()))

            } else {
                return this.restaurants
            }
        }
    }
})