<script setup>
import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import ProduitComponent from "@/components/produits/produitComponent.vue";
import {produitStore} from "@/stores/produitStore";
import ProduitCreateComponent from "@/components/produits/produitCreateComponent.vue";

const storeProduit = produitStore()
</script>

<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <div class="flex flex-wrap flex-row justify-evenly h-auto overflow-y-auto">
            <produit-component v-for="produit of storeProduit.produits" :key="produit.id" :produit="produit"></produit-component>
            <produit-create-component></produit-create-component>
        </div>
    </div>
</template>

<style scoped>

</style>