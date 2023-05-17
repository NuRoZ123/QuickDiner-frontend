import {defineStore} from "pinia";
import _ from "lodash";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const menuStore = defineStore("menuStore", {
    state : () => ({
        menus : [],
        typeMenu: []
    }),
    actions : {
        async getAllTypeOfMenus() {
            await fetch(`${apiUrl}/api/produits/types`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (result) => {
                this.typeMenu = await result.json()
            })
        },
        async getAllMenu(idRetaurant) {
            await fetch(`${apiUrl}/api/produits/${idRetaurant}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(async (result) => this.menus = await result.json())
        },
        getTypeParRestaurant() {
            const listOfTypeInMenus = _.map(_.uniqBy(this.menus, 'typeProduit'), 'typeProduit')
            return listOfTypeInMenus.filter(element => this.typeMenu.includes(element))
        }
    }
})

export {
    menuStore
}