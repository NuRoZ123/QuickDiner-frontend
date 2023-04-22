<template>
    <div class="flex flex-col mx-8 mt-8">
        <div class="flex flex-row">
            <div class="h-20 w-20 bg-gray-400"></div>
            <div class="flex flex-col ml-2">
                <span class="font-bold">{{menu.nom}}</span>
                <span>{{menu.prix}} €</span>
            </div>
        </div>
        <div class="flex mt-4 w-32 justify-between mx-auto">
            <font-awesome-icon class="rounded-3xl text-white bg-black p-1 w-6" icon="fa-solid fa-minus" @click="getQuantity('minus')"></font-awesome-icon>
            <div class="flex justify-center items-center w-8 border-black border focus:outline-0 rounded-3xl">{{menu.quantity}}</div>
            <font-awesome-icon class="rounded-3xl text-white bg-black p-1 w-6" icon="fa-solid fa-plus" @click="getQuantity('plus')"></font-awesome-icon>
        </div>
    </div>

</template>

<script setup>
import {defineProps} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {panierStore} from "@/stores/panierStore";
const props = defineProps(['menu'])

const storePanier = panierStore()

const getQuantity = (addOrRemove) => {
    if(addOrRemove === "plus") {
        storePanier.addProduit(props.menu)
    } else {
        storePanier.removeProduitId(props.menu.id)
    }
}
</script>

<style scoped>

</style>