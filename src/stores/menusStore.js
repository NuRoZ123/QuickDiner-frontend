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
                const listOfTypeInMenus = _.map(_.uniqBy(this.menus, 'typeProduit'), 'typeProduit')
                const listOfTypeMenus = await result.json()

                console.log(listOfTypeInMenus)
                console.log(listOfTypeInMenus.filter(element => listOfTypeMenus.includes(element)))
                this.typeMenu = listOfTypeInMenus.filter(element => listOfTypeMenus.includes(element))

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
    }
})

export {
    menuStore
}