<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <div class="h-screen overflow-y-auto flex flex-wrap items-center justify-center ">
            <commande-component v-for="commande of storeCommande.commandes" :key="commande" :commande="commande" v-show="storeAuth.role === 'Client'"></commande-component>
            <commande-commercant-component v-for="commande of storeCommande.commandes" :key="commande" :commande="commande" v-show="storeAuth.role === 'Commercant'"></commande-commercant-component>
        </div>
    </div>
</template>

<script setup>

import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import CommandeComponent from "@/components/commandes/commandeComponent.vue";
import {commandesStore} from "@/stores/commandesStore";
import {authStore} from "@/stores/authStore";
import CommandeCommercantComponent from "@/components/commandes/commandeCommercantComponent.vue";

const storeCommande = commandesStore()
const storeAuth = authStore()

if (storeAuth.role === 'Client') {
    storeCommande.getCommandes()
} else {
    storeCommande.getCommandesCommercant()
}

</script>

<style scoped>

</style>