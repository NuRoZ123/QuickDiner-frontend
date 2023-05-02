<script setup>
import {defineProps} from 'vue'

const props = defineProps(['commande'])

const totalPrice = () => {
    let price = 0
    for (const element of props.commande.produitsCommander) {
        price += element.quantite * element.produit.prix
    }

    return price
}
</script>

<template>
    <div class="w-96 h-96 flex justify-center flex-col shadow border border-gray-200 m-5">
        <h1 class="text-3xl mx-auto h-auto my-2">CM-{{commande.id}}</h1>
        <div class="h-full overflow-y-auto flex flex-col justify-center py-5">
            <div class="flex ml-20 h-auto mt-4 items-center" v-for="produit of commande.produitsCommander" :key="produit">
                <img class="w-20 h-20" :src="produit.produit.image" :alt="`produit-${produit.produit.nom}`">
                <div class="flex flex-col justify-center ml-10">
                    <span>nom : {{produit.produit.nom}}</span>
                    <span>quantité : {{produit.quantite}}</span>
                </div>

            </div>
        </div>
        <span class="mx-auto mt-2">total de la commande : {{totalPrice()}} €</span>
        <div class="my-5 text-white bg-black rounded-3xl p-2 w-auto mx-auto px-4">Faire une réclamation</div>
    </div>
</template>

<style scoped>

</style>