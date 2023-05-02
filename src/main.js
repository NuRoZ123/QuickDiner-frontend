import { createApp } from 'vue'
import App from './App.vue'
import './style/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faArrowLeft, faBars,
    faBasketShopping,
    faMagnifyingGlass,
    faMapMarkerAlt, faMinus, faPlus, faTrash,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {createRouter, createWebHistory} from "vue-router";
import HomeViewComponent from "@/components/Views/homeViewComponent.vue";
import CommandeViewComponent from "@/components/Views/commandeViewComponent.vue";
import ConnexionViewComponent from "@/components/Views/connexionViewComponent.vue";
import MenuViewComponent from "@/components/Views/menuViewComponent.vue";

import {createPinia} from "pinia";
import {authStore} from "@/stores/authStore";
import UserViewComponent from "@/components/Views/userViewComponent.vue";
import {faFile} from "@fortawesome/free-regular-svg-icons";
import CommercantViewComponent from "@/components/Views/commercantViewComponent.vue";

library.add(faMagnifyingGlass, faBasketShopping, faXmark, faMapMarkerAlt, faArrowLeft, faBars, faPlus, faMinus, faTrash, faFile)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeViewComponent,
            meta : {requiresNotCommercant: true}
        },
        {
            path: '/commandes',
            name: 'commandes',
            component: CommandeViewComponent
        },
        {
            path: '/authentification',
            name: 'authentification',
            component: ConnexionViewComponent,
            meta: { requiresGuest: true }
        },
        {
            path: '/restaurant/:id',
            name: 'restaurant',
            component: MenuViewComponent
        },
        {
            path: '/profile',
            name : 'profile',
            component: UserViewComponent,
            meta: { requiresConnected: true }
        },
        {
            path: '/commerce',
            name : 'commerce',
            component: CommercantViewComponent,
            meta : {requiresConnected: true}
        }
    ]
})

createApp(App)
    .use(router)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

router.beforeEach((to, from, next) => {
    const isAuthenticated = authStore().token
    const isClient = authStore().role
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    const requiresConnected = to.matched.some(record => record.meta.requiresConnected)
    const requiresNotCommercant = to.matched.some(record => record.meta.requiresNotCommercant)

    if (requiresGuest && isAuthenticated) {
        next('/')
    } else if (requiresConnected && !isAuthenticated) {
        next('/')
    } else if (requiresNotCommercant && isAuthenticated && isClient === 'Commercant') {
        next('commerce')
    } else if (!requiresNotCommercant && isAuthenticated && isClient === 'Client') {
        next('/')
    }
    else {
        next()
    }
})