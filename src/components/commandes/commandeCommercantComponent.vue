<script setup>
import {defineProps, ref} from 'vue'
import {commandesStore} from "@/stores/commandesStore";

defineProps(['commande'])

const storeCommandes = commandesStore()
const imageLoaded = ref(false)

</script>

<template>
    <div class="w-96 h-80 flex justify-center flex-col shadow border border-gray-200 m-5">
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
        <div class="my-5 text-white bg-black rounded-3xl p-2 w-auto mx-auto px-4 cursor-pointer" @click="storeCommandes.updateCommandes(commande.id)">Valider la commande</div>
    </div>
</template>

<style scoped>

</style>