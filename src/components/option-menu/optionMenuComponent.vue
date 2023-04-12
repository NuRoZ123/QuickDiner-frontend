<template>
    <div class="absolute right-0 top-0 w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-500" v-show="toggleMenu"></div>
    <div class="absolute top-0 left-0 w-80 h-screen bg-white shadow-lg z-10 transform transition-all duration-500" :class="toggleMenu ? 'translate-x-0' : '-translate-x-full'">
        <font-awesome-icon class="absolute right-4 top-4 w-6 h-6 cursor-pointer hover:bg-gray-200 p-2 rounded-3xl" icon="fa-solid fa-xmark" @click="toggleMenu = false"></font-awesome-icon>

        <div class="mt-20">
            <ul>
                <router-link class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'home'}" @click="toggleMenu = false">Accueil</router-link>
                <router-link class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'commandes'}" @click="toggleMenu = false">Commandes</router-link>
                <router-link class="block py-2 px-4 text-gray-800 hover:bg-gray-200" :to="{ name: 'authentification'}" @click="toggleMenu = false">Connexion / Register</router-link>
            </ul>
        </div>
    </div>



</template>

<script setup>
import {toggleMenu} from "@/utils";
</script>

<style scoped>

</style>