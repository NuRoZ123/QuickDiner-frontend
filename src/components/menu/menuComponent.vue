<template>
  <div class="flex flex-col mb-4 h-36 justify-center shadow items-end px-4 hover:shadow-2xl transition-shadow">
      <div class="flex flex-row justify-center h-20 items-center">
          <div class="flex flex-col w-96">
              <span class="font-bold">{{menu.nom}}</span>
              <span>{{menu.description}}</span>
              <span>{{menu.prix}} €</span>
          </div>
          <div class="w-20 h-20 bg-gray-300"></div>
      </div>

      <div class="flex mt-4 w-32 justify-between">
          <font-awesome-icon class="rounded-3xl text-white bg-black p-1 w-6" icon="fa-solid fa-minus" @click="getQuantity('minus')"></font-awesome-icon>
          <div class="flex justify-center items-center w-8 border-black border focus:outline-0 rounded-3xl">{{storePanier.panier.find(menuPanier => menuPanier.id === menu.id) ? storePanier.panier.find(menuPanier => menuPanier.id === menu.id).quantity : 0}}</div>
          <font-awesome-icon class="rounded-3xl text-white bg-black p-1 w-6" icon="fa-solid fa-plus" @click="getQuantity('plus')"></font-awesome-icon>
      </div>

  </div>

</template>

<script setup>
import {defineProps } from 'vue'
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