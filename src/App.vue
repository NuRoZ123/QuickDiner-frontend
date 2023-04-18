<template>
    <router-view></router-view>
    <option-menu-component></option-menu-component>
    <panier-menu></panier-menu>
</template>

<script setup>
import OptionMenuComponent from "@/components/option-menu/optionMenuComponent.vue";
import {authStore} from "@/stores/authStore";
import PanierMenu from "@/components/panier/panierMenu.vue";

const storeAuth = authStore()

if (localStorage.getItem('token')) {
    storeAuth.reconnect()
}
</script>

<style>
</style>
