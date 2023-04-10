import { createApp } from 'vue'
import App from './App.vue'
import './style/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faBasketShopping, faMagnifyingGlass, faMapMarkerAlt, faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass, faBasketShopping, faXmark, faMapMarkerAlt)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
