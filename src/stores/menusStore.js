import {defineStore} from "pinia";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const menuStore = defineStore("menuStore", {
    states : () => ({
        menus : [],
    }),
    actions : {
        async getAllMenu(idRetaurant) {
            await fetch(`${apiUrl}/api/produits/${idRetaurant}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (result) => this.menus = await result.json())
        },
    }
})

export {
    menuStore
}