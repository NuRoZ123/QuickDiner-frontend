<template>
  <div class="flex w-full h-60 border-b border-t justify-between">
      <div class="flex flex-row my-6 w-full">
          <div class="flex flex-row ml-48 w-2/3">
              <img class="bg-cover" :src="restaurant.restaurant.image" :alt="`restaurant-${restaurant.restaurant.nom}`">
              <div class="flex flex-col ml-8">
                  <span class="text-5xl font-bold">{{restaurant.restaurant.nom.toUpperCase()}}</span>
                  <span class="ml-0.5 text-gray-500">{{restaurant.restaurant.adresse}}</span>
              </div>
          </div>
          <iframe class="h-auto ml-full mr-48" src="https://www.openstreetmap.org/export/embed.html?bbox=2.2956%2C48.8649%2C2.4131%2C48.9057&amp;layer=mapnik&amp;marker=48.8853%2C2.3542"></iframe>
      </div>

      <!--      {{restaurant}}-->
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
defineProps(['restaurant'])
</script>

<style scoped>

</style>