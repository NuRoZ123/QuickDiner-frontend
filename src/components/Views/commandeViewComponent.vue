<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <div class="h-screen overflow-y-auto flex flex-wrap items-center justify-center" ref="scrollContainer">
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
import {nextTick, ref} from "vue";

const storeCommande = commandesStore()
const storeAuth = authStore()


if (storeAuth.role === 'Client') {
    storeCommande.getCommandes()
        .then(async() => {
          await scrollToBottom()
        })

} else {
    storeCommande.getCommandesCommercant()
        .then(async() => {
          await scrollToBottom()
        })

}

const scrollContainer = ref(null);

const scrollToBottom = async () => {
  await nextTick();
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}
</script>

<style scoped>

</style>