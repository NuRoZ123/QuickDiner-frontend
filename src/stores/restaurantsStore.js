import {defineStore} from "pinia";
import {authStore} from "@/stores/authStore";
import _, {capitalize, round} from "lodash";
import {getDistance} from "@/utils";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

export const restaurantsStore = defineStore('restaurantsStore', {
    state : () => ({
        restaurants : [],
        restaurant: {},
        filter: {name: "", avgPrice: null, note: 0, ville : "", order: false, km: null},
        maxPrice: null,
        maxKm: null,
        restaurantsVille : [],
        adresse : {}
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
                    const restaurants = await result.json()
                    this.restaurants = _.map(restaurants, obj => _.set(obj, 'km', 0));
                    console.log(this.restaurants)
                    const maxPrice = this.restaurants.reduce((max, objet) => (objet.prixMoyen > max) ? objet.prixMoyen : max, this.restaurants[0].prixMoyen)
                    this.filter.avgPrice = round(maxPrice)
                    this.maxPrice = round(maxPrice)
                    this.restaurantsVille = _.map(_.uniqBy(this.restaurants, item => item.restaurant.ville.toLowerCase()), (restaurant) =>  capitalize(restaurant.restaurant.ville))
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
            if(this.filter.avgPrice !== 0 || this.filter.name !== "" || this.filter.note !== 0) {
                return this.restaurants.filter(restaurant => {
                    const res = restaurant.restaurant
                    const nom = res.nom.toLowerCase()
                    const avgPrice = restaurant.prixMoyen
                    const note = restaurant.note
                    const ville = res.ville
                    const km = restaurant.km

                    return (
                        (this.filter.avgPrice === 0 || avgPrice <= this.filter.avgPrice) &&
                        (this.filter.name === "" || nom.includes(this.filter.name.toLowerCase())) &&
                        (this.filter.note === 0 || note >= this.filter.note) &&
                        (this.filter.ville === "" || ville.toLowerCase().includes(this.filter.ville.toLowerCase())) &&
                        (this.filter.km === 0 || km <= this.filter.km)
                    );

                }).sort((a, b) => {
                    const valueA = a.km; // Propriété utilisée pour le tri
                    const valueB = b.km; // Propriété utilisée pour le tri

                    // Utilisation de l'opérateur ternaire pour déterminer l'ordre de tri
                    const order = this.filter.order ? 1 : -1;

                    if (valueA < valueB) {
                        return -1 * order; // Inverse l'ordre si nécessaire
                    } else if (valueA > valueB) {
                        return 1 * order; // Inverse l'ordre si nécessaire
                    } else {
                        return 0;
                    }
                })

            } else {
                return this.restaurants
            }
        },
        filterVilleRestaurant () {
            return this.restaurantsVille.filter(ville => ville.toLowerCase().includes(this.filter.ville.toLowerCase()))
        },
        resetAdresse() {
            this.adresse = {}
            this.restaurants.forEach(restaurant => restaurant.km = 0)
        },
        updateKmRestaurants() {
            this.restaurants.forEach(restaurant => {
                restaurant.km = round(getDistance(this.adresse.geometry.coordinates[1], this.adresse.geometry.coordinates[0], restaurant.restaurant.latitude, restaurant.restaurant.longitude),2)
                const maxKm = this.restaurants.reduce((max, objet) => (objet.km > max) ? objet.km : max, this.restaurants[0].km)
                this.filter.km = maxKm
                this.maxKm = maxKm
            })
            console.log(this.restaurants)
        }
    }
})