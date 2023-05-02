<template>
    <router-view></router-view>
    <option-menu-component></option-menu-component>
    <panier-menu></panier-menu>
    <delete-account></delete-account>
</template>

<script setup>
import OptionMenuComponent from "@/components/option-menu/optionMenuComponent.vue";
import {authStore} from "@/stores/authStore";
import PanierMenu from "@/components/panier/panierMenu.vue";
import DeleteAccount from "@/components/auth/deleteAccount.vue";
import {panierStore} from "@/stores/panierStore";
import {commandesStore} from "@/stores/commandesStore";

const storeAuth = authStore()
const storePanier = panierStore()
const storeCommande = commandesStore()

if (localStorage.getItem('token')) {
    storeAuth.reconnect()
    if (storeAuth.role === 'Client') {
        storeCommande.getCommandes()
        storePanier.getPanierUserConnected()
    } else {
        storeCommande.getCommandesCommercant()
    }
}
</script>

<style>
</style>
