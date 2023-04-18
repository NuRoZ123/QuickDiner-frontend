import { createApp } from 'vue'
import App from './App.vue'
import './style/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faArrowLeft, faBars,
    faBasketShopping,
    faMagnifyingGlass,
    faMapMarkerAlt,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {createRouter, createWebHistory} from "vue-router";
import HomeViewComponent from "@/components/Views/homeViewComponent.vue";
import CommandeViewComponent from "@/components/Views/commandeViewComponent.vue";
import ConnexionViewComponent from "@/components/Views/connexionViewComponent.vue";
import MenuViewComponent from "@/components/Views/menuViewComponent.vue";

import {createPinia} from "pinia";
import {authStore} from "@/stores/authStore";

library.add(faMagnifyingGlass, faBasketShopping, faXmark, faMapMarkerAlt, faArrowLeft, faBars)

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
            component: ConnexionViewComponent,
            meta: { requiresGuest: true }
        },
        {
            path: '/restaurant/:id',
            name: 'restaurant',
            component: MenuViewComponent
        }
    ]
})

createApp(App)
    .use(router)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')


router.beforeEach((to, from, next) => {
    const isAuthenticated = authStore().token; // Vérifie si l'utilisateur est authentifié
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest); // Vérifie si la route est accessible uniquement pour les utilisateurs non connectés

    if (requiresGuest && isAuthenticated) {
        next('/'); // Redirige l'utilisateur vers la page d'accueil si déjà connecté
    } else {
        next(); // Laisse l'utilisateur accéder à la page
    }
});