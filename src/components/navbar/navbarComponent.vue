<script setup>
import {panierMenu, toggleMenu} from "@/utils";
import {useRoute} from "vue-router";
import {authStore} from "@/stores/authStore";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {panierStore} from "@/stores/panierStore";
import {restaurantsStore} from "@/stores/restaurantsStore";

const route = useRoute()

const storeAuth = authStore()
const storePanier = panierStore()
const storeRestaurants = restaurantsStore()
</script>

<template>
  <nav class="grid grid-cols-8 gap-4 h-20 flex items-center justify-center">
      <div class="col-start-1 flex justify-center items-center">
          <RouterLink v-if="route.name === 'restaurant' && storeAuth.role !== 'Commercant'" :to="{name : 'home'}"><button class="bg-black rounded-3xl text-white py-1 px-3"><font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon> Retour</button></RouterLink>
          <div class="rounded-3xl hover:bg-gray-200 w-10 h-10 flex flex-col justify-center items-center cursor-pointer ml-4" @click="toggleMenu = true">
              <font-awesome-icon icon="fa-solid fa-bars"></font-awesome-icon>
          </div>
      </div>
      <router-link v-if="route.name !== 'authentification' && !storeAuth.token" class="block py-2 px-4 text-gray-800 col-start-2" :to="{ name: 'authentification'}" @click="toggleMenu = false"><button class="bg-gray-200 rounded-3xl p-2 px-4">Connexion</button></router-link>
      <div class="col-start-2 cursor-pointer" v-if="route.name !== 'authentification' && storeAuth.token">
          <router-link :to="{name : 'profile'}"><button class="bg-gray-200 rounded-3xl p-2 px-4">{{storeAuth.user}}</button></router-link>
      </div>

      <div v-if="route.name === 'home'" class="relative col-start-3 col-end-7">
          <input v-model="storeRestaurants.filter" type="text" class="bg-gray-200 rounded-3xl p-2 px-12 w-full" placeholder="Rechercher...">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute top-1/2 left-4 -translate-y-1/2"></font-awesome-icon>
      </div>

      <div v-if="(route.name === 'home' || route.name === 'restaurant') && (storeAuth.role === 'Client' || storeAuth.role === '')" class="col-start-8 flex items-center justify-between relative">
          <button type="button" class="text-white bg-black rounded-3xl p-2 w-full mr-8" @click="panierMenu = true"><font-awesome-icon icon="fa-solid fa-basket-shopping" class="mr-2"></font-awesome-icon>Panier</button>
          <span v-if="storePanier.panier && storePanier.panier.length > 0 " class="ml-4 rounded-3xl bg-white text-black w-6 h-6 absolute flex justify-center items-center right-5 top-2">{{storePanier.panier.length}}</span>
      </div>
  </nav>
</template>

<style scoped>

</style>