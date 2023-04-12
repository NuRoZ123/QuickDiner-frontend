import { createApp } from 'vue'
import App from './App.vue'
import './style/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faBasketShopping, faMagnifyingGlass, faMapMarkerAlt, faXmark} from "@fortawesome/free-solid-svg-icons";
import {createRouter, createWebHistory} from "vue-router";
import HomeViewComponent from "@/components/Views/homeViewComponent.vue";
import CommandeViewComponent from "@/components/Views/commandeViewComponent.vue";
import ConnexionViewComponent from "@/components/Views/connexionViewComponent.vue";
import {createPinia} from "pinia";

library.add(faMagnifyingGlass, faBasketShopping, faXmark, faMapMarkerAlt)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeViewComponent
        },
        {
            path: '/commandes',
            name: 'commandes',
            component: CommandeViewComponent
        },
        {
            path: '/authentification',
            name: 'authentification',
            component: ConnexionViewComponent
        }
    ]
})

createApp(App)
    .use(router)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
