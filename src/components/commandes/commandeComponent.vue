<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps(['commande'])

const imageLoaded = ref(false)

const totalPrice = () => {
    let price = 0
    if (Array.isArray(props.commande.produitsCommander)) {
        for (const element of props.commande.produitsCommander) {
            price += element.quantite * element.produit.prix
        }
    }

    return price
}
</script>

<template>
    <div class="w-96 h-96 flex justify-center flex-col shadow border border-gray-200 m-5 relative">
        <div class="grid my-2 grid-cols-6 flex items-center justify-center">
            <h1 class="col-start-3 col-end-5 text-3xl mx-auto h-auto">CM-{{commande.id}}</h1>
            <div class="col-start-5 mx-auto">
                <div v-if="!commande.completed" class="h-8 w-20 rounded-full bg-orange-500 animate-pulse flex justify-center items-center">En Cours</div>
                <div v-else class="h-8 w-20 rounded-full bg-green-500 flex justify-center items-center">Terminée</div>
            </div>
        </div>

        <div class="h-full overflow-y-auto flex flex-col justify-center py-5">
            <div class="flex ml-20 h-auto mt-4 items-center" v-for="produit of commande.produitsCommander" :key="produit">
              <div class="w-20 h-20 relative">
                <img class="absolute z-[1] w-full h-full" :src="produit.produit.image" :alt="`produit-${produit.produit.nom}`" @load="imageLoaded = true">
                <div v-show="!imageLoaded" class="absolute bg-gray-300 w-full h-full"></div>
              </div>

                <div class="flex flex-col justify-center ml-10">
                    <span>nom : {{produit.produit.nom}}</span>
                    <span>quantité : {{produit.quantite}}</span>
                </div>

            </div>
        </div>
        <span class="mx-auto mb-6">total de la commande : {{totalPrice()}} €</span>

    </div>
</template>

<style scoped>

</style>