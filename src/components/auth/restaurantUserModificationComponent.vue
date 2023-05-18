<script setup>

import {reactive} from "vue";
import {produitStore} from "@/stores/produitStore";
import {restaurantsStore} from "@/stores/restaurantsStore";


const storeProduit = produitStore()
const storeRestaurant = restaurantsStore()

storeProduit.getOwnRestaurant()

const restaurant = reactive({
  nom : storeProduit.restaurantOwn.nom,
  adresse : storeProduit.restaurantOwn.adresse,
  image : storeProduit.restaurantOwn.image,
})

const updateRestaurant = () => {
  if(restaurant.nom && restaurant.adresse && restaurant.image) {
    storeRestaurant.updateRestaurant(restaurant)
  }
}

const updateImage = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    restaurant.image = reader.result
  }

  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="flex flex-col w-[600px] h-[420px] justify-center items-center shadow border border-gray-200 py-10 mt-10">
    <span class="text-2xl font-bold mb-6">Modifier le restaurant</span>

    <div class="flex w-full">
      <div class="relative w-56 h-40">
        <img :src="restaurant.image"  alt="image-du-produit" class="absolute w-full h-full">
        <input type="file" accept="image/*" class="absolute opacity-0 w-full h-full" @change="updateImage">
      </div>
      <div class="flex flex-col my-auto w-[560px] ml-6">
        <label class="font-bold" for="name">Nom</label>
        <input class="w-[400px] px-2 py-1 rounded-md border-gray-300 border" type="text" id="name" placeholder="nom" v-model="restaurant.nom">
        <label class="font-bold" for="adresse">Adresse</label>
        <input class="w-[400px] px-2 py-1 rounded-md border-gray-300 border" type="text" id="adresse" placeholder="adresse" v-model="restaurant.adresse">
      </div>
    </div>




    <button class="rounded-3xl w-[560px] mt-20 py-2 bg-black text-white" type="submit" @click="updateRestaurant()">Modifier</button>
  </div>
</template>

<style scoped>

</style>