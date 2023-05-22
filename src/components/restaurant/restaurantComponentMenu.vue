<template>
  <div class="flex w-full h-60 border-b border-t justify-between">
      <div class="flex flex-row my-6 w-full">
          <div class="flex flex-row ml-48 w-2/3">
            <div class="w-48 h-48 relative">
              <img class="absolute z-[1] w-full h-full" :src="restaurant.restaurant.image" :alt="`image-${restaurant.restaurant.nom}`" @load="imageLoaded = true">
              <div v-show="!imageLoaded" class="absolute bg-gray-300 w-full h-full"></div>
            </div>
              <div class="flex flex-col ml-8">
                  <span class="text-5xl font-bold">{{restaurant.restaurant.nom.toUpperCase()}}</span>
                  <span class="ml-0.5 text-gray-500">{{restaurant.restaurant.adresse}}</span>
                  <span class="ml-0.5 text-gray-500">{{restaurant.restaurant.ville}}</span>
              </div>
          </div>
          <iframe class="h-auto ml-full mr-48" src="https://www.openstreetmap.org/export/embed.html?bbox=2.294%2C48.8949%2C2.2945%2C48.8383&amp;layer=mapnik&amp;marker=48.8583%2C2.2945"></iframe>
      </div>
  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue'
defineProps(['restaurant'])
const imageLoaded = ref(false)
</script>

<style scoped>

</style>