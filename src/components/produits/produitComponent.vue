<script setup>
import {defineProps, ref} from 'vue'
import {produitStore} from "@/stores/produitStore";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ProduitModifyComponent from "@/components/produits/produitModifyComponent.vue";
const props = defineProps(['produit'])

const toggleModifyProduct = ref(false);

const storeProduit = produitStore()

const deleteProduit = () => {
    storeProduit.deleteProduit(props.produit.id)
}
</script>

<template>
  <div class="flex flex-col shadow w-96 mx-4 my-12 border border-gray-200 items-center" :class="[toggleModifyProduct ? 'h-[304px]' :'h-72']">
      <div v-if="!toggleModifyProduct" class="h-72">
          <div class="flex justify-center items-center w-full justify-around">
              <img :src="produit.image" :alt="`image-${produit.nom}`" class="w-28 h-28">
              <div class="flex flex-col w-60 ml-5">
                  <span>{{produit.nom}}</span>
                  <span>{{produit.prix}} €</span>
              </div>
          </div>
          <p class="mt-4 h-20 overflow-y-auto break-all">{{produit.description}}</p>
          <div class="flex items-center justify-end mt-auto ml-auto">
              <button class="rounded-3xl w-8 h-8 bg-yellow-500 text-white" @click="toggleModifyProduct = true"><font-awesome-icon icon="fa-solid fa-pen"></font-awesome-icon></button>
              <button class="rounded-3xl mx-2 w-8 h-8 bg-red-500 text-white" @click="deleteProduit()"><font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon></button>
          </div>
      </div>
      <produit-modify-component v-else :produit="produit" @toggleModify="toggleModifyProduct = false"></produit-modify-component>
  </div>
</template>

<style scoped>

</style>