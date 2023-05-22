<template>
    <div class="absolute z-10 left-0 top-0 w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-500" v-show="panierMenu" @click="panierMenu = false"></div>
    <div class="absolute z-10 top-0 right-0 w-80 h-screen bg-white shadow-lg z-10 transform transition-all duration-500 overflow-hidden" :class="panierMenu ? 'translate-x-0' : 'translate-x-full'" style="overflow-x: hidden;">
        <font-awesome-icon class="absolute right-4 top-4 w-6 h-6 cursor-pointer hover:bg-gray-200 p-2 rounded-3xl" icon="fa-solid fa-xmark" @click="panierMenu = false"></font-awesome-icon>
        <font-awesome-icon class="absolute left-4 top-4 w-6 h-6 cursor-pointer bg-red-600 text-white p-2 rounded-3xl" icon="fa-solid fa-trash" @click="clearPanier()"></font-awesome-icon>
        <div class="mt-24 overflow-y-auto h-[74vh]">
            <menu-in-panier v-for="menu of storePanier.panier" :key="menu.id" :menu="menu"></menu-in-panier>
        </div>
        <div class="w-full h-20 bg-white flex flex-col items-center justify-center">
            <span>{{totalPrice()}} €</span>
            <button type="button" class="text-white bg-black rounded-3xl p-2 w-auto mt-8" @click="sendCommande()">Commander</button>
        </div>
    </div>
</template>

<script setup>
import {panierMenu} from "@/utils";
import MenuInPanier from "@/components/panier/menuInPanier.vue";
import {panierStore} from "@/stores/panierStore";
import {commandesStore} from "@/stores/commandesStore";
import {authStore} from "@/stores/authStore";
import {useRouter} from "vue-router";

const storePanier = panierStore()
const storeCommande = commandesStore()
const storeAuth = authStore()

const router = useRouter()

const sendCommande = async () => {
    const commande = []

    for (let storePanierProduit of storePanier.panier) {
        commande.push({id: storePanierProduit.id, quantite: storePanierProduit.quantity})
    }

    if(storeAuth.token) {
      await storeCommande.sendCommande(commande)
      if (storePanier.panier.length > 0) {
        await router.push('/commandes')
        await storePanier.clearPanier()
      }
      panierMenu.value = false
    } else {
      await router.push('/authentification')
      panierMenu.value = false
    }
}

const clearPanier = () => {
    storePanier.clearPanier()
}

const totalPrice = () => {
    let price = 0
    for (const element of storePanier.panier) {
        price += element.quantity * element.prix
    }

    return price
}
</script>

<style scoped>

</style>