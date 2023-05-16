<template>
    <div class="absolute right-0 top-0 w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-500" v-show="toggleMenu"  @click="toggleMenu = false"></div>
    <div class="absolute top-0 left-0 w-80 h-screen bg-white shadow-lg z-10 transform transition-all duration-500" :class="toggleMenu ? 'translate-x-0' : '-translate-x-full'">
        <font-awesome-icon class="absolute right-4 top-4 w-6 h-6 cursor-pointer hover:bg-gray-200 p-2 rounded-3xl" icon="fa-solid fa-xmark" @click="toggleMenu = false"></font-awesome-icon>

        <div class="mt-20">
            <ul>
                <router-link v-if="storeAuth.role === 'Commercant' && storeProduit.restaurantOwn.id !== 0" class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'restaurant', params: { id: storeProduit.restaurantOwn.id}}" @click="toggleMenu = false">Restaurant</router-link>
                <router-link v-if="storeAuth.role !== 'Commercant'" class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'home'}" @click="toggleMenu = false">Accueil</router-link>
                <router-link v-if="storeAuth.role === 'Commercant' && storeAuth.token" class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'commerce'}" @click="toggleMenu = false">Commerce</router-link>
                <router-link v-if="storeAuth.token" class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'commandes'}" @click="toggleMenu = false">Commandes</router-link>
                <router-link v-if="!storeAuth.token" class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'authentification'}" @click="toggleMenu = false">Connexion / Register</router-link>
                <router-link v-if="storeAuth.token" class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'profile'}" @click="toggleMenu = false">Profil</router-link>
                <div v-if="storeAuth.token" class="block py-2 px-4 text-gray-800 hover:bg-gray-200 cursor-pointer" @click="logout()">Déconnexion</div>
            </ul>
        </div>
    </div>

</template>

<script setup>
import {toggleMenu} from "@/utils";
import {authStore} from "@/stores/authStore";
import {useRouter} from "vue-router";
import {panierStore} from "@/stores/panierStore";
import {commandesStore} from "@/stores/commandesStore";
import {produitStore} from "@/stores/produitStore";

const storeAuth = authStore()
const router = useRouter()
const storeCommandes = commandesStore()
const storeProduit = produitStore()

const logout = () => {
    localStorage.clear()
    storeAuth.token = ""
    storeAuth.role = ""
    storeAuth.user = ""
    storeCommandes.clearCommandes()
    storeCommandes.clearWs()
    storeProduit.clearRestaurantOwn()
    toggleMenu.value = false
    panierStore().clearPanier()

    router.push('/')
}
</script>

<style scoped>

</style>