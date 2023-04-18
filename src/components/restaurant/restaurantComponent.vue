<template>
  <div class="w-64 h-44 bg-white my-4 shadow flex ml-8 flex-col relative justify-between ">
      <div class="flex justify-center overflow-hidden mb-4">
          <img class="bg-cover" :src="restaurant.restaurant.image" :alt="`image-${restaurant.restaurant.nom}`">
      </div>
      <div class="flex flex-row justify-center items-center mb-3">
          <div class="flex flex-col">
              <span class="pl-1">{{restaurant.restaurant.nom}}</span>
              <span class="pl-1 text-gray-400 text-xs">{{restaurant.restaurant.adresse}}</span>
          </div>
          <router-link class="flex justify-center items-center ml-auto mr-4" :to="{name: 'restaurant', params: { id: restaurant.restaurant.id}}"><button class="bg-black rounded-3xl text-white py-1 px-3">Voir plus</button></router-link>
      </div>

      <div v-if="restaurant.note !== -1" class="absolute w-6 h-6 rounded-3xl top-2 right-2 bg-white flex items-center justify-center text-xs">
          {{restaurant.note}}
      </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    restaurant: Object
});

</script>

<style scoped>

</style>