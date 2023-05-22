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

const imageLoaded = ref(false)
</script>

<template>
  <div class="flex flex-col shadow w-96 h-[380px] mx-4 mt-12 border border-gray-200 items-center" :class="[toggleModifyProduct ? 'h-[304px]' :'h-72']">
      <div v-if="!toggleModifyProduct" class="h-auto w-auto">
        <div class="flex justify-between items-center mt-4 mx-4">
          <div class="bg-black text-white rounded-3xl px-2 py-1 w-40 flex items-center justify-center">
            {{produit.typeProduit}}
          </div>
          <div class="flex items-center justify-end">
            <button class="rounded-3xl w-7 h-7 bg-yellow-500 text-white" @click="toggleModifyProduct = true"><font-awesome-icon icon="fa-solid fa-pen"></font-awesome-icon></button>
            <button class="rounded-3xl mx-2 w-7 h-7 bg-red-500 text-white" @click="deleteProduit()"><font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon></button>
          </div>
        </div>

          <div class="flex justify-center items-center mx-4 mt-2 w-full justify-around">
              <div class="w-28 h-28 relative">
                <img class="absolute z-[1] w-full h-full" :src="produit.image" :alt="`produit-${produit.nom}`" @load="imageLoaded = true">
                <div v-show="!imageLoaded" class="absolute bg-gray-300 w-full h-full"></div>
              </div>
              <div class="flex flex-col w-60 ml-5">
                  <span>{{produit.nom}}</span>
                  <span>{{produit.prix}} €</span>
              </div>
          </div>
          <p class="mt-4 h-20 overflow-y-auto break-words mx-4 whitespace-pre-wrap flex justify-start">{{produit.description}}</p>

      </div>
      <produit-modify-component v-else :produit="produit" @toggleModify="toggleModifyProduct = false"></produit-modify-component>
  </div>
</template>

<style scoped>

</style>