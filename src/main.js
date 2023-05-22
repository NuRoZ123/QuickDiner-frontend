import { createApp } from 'vue'
import App from './App.vue'
import './style/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faArrowLeft, faBars,
    faBasketShopping, faCheck,
    faMagnifyingGlass,
    faMapMarkerAlt, faMinus, faPen, faPlus, faStar, faTrash, faUser,
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

library.add(faMagnifyingGlass, faBasketShopping, faXmark, faMapMarkerAlt, faArrowLeft, faBars, faPlus, faMinus, faTrash, faFile, faPen, faStar, faUser, faCheck)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeViewComponent,
            meta : {isNotCommercant : true}
        },
        {
            path: '/commandes',
            name: 'commandes',
            component: CommandeViewComponent,
            meta: { requiresConnected: true }
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
            component: MenuViewComponent,
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
            meta : {isCommercant : true}
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
    const isNotCommercant = to.matched.some(record => record.meta.isNotCommercant)
    const isCommercant = to.matched.some(record => record.meta.isCommercant)


    if (isAuthenticated  && isClient === "Cient" && isNotCommercant) {
        next()
    } else if(!isAuthenticated && isClient === "" && isNotCommercant){
        next()
    } else if (isAuthenticated && isClient === "Commercant" && isNotCommercant) {
        next('commerce')
    } else if (isAuthenticated && isCommercant && isClient === "Commercant") {
        next()
    } else if (isAuthenticated && isCommercant && isClient === "Client") {
        next('/')
    } else if (!isAuthenticated && isCommercant && isClient === "") {
        next('/')
    } else if (isAuthenticated && requiresConnected && isClient !== "") {
        next()
    } else if (!isAuthenticated && requiresConnected && isClient === "") {
        next('/')
    } else if (requiresGuest && isAuthenticated) {
        next('/')
    } else if (requiresGuest && !isAuthenticated) {
        next()
    }
    else {
        next()
    }
})