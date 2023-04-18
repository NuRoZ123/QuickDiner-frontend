<template>
  <div class="flex flex-row mb-6 h-32 justify-between shadow items-center px-4 hover:shadow-2xl transition-shadow">
      <div class="flex flex-col w-96">
          <span class="font-bold">{{menu.nom}}</span>
          <span>{{menu.description}}</span>
          <span>{{menu.prix}} €</span>
      </div>
      <div class="w-20 h-20 bg-gray-300"></div>

  </div>
</template>

<script setup>
import {defineProps} from 'vue'
defineProps(['menu'])
</script>

<style scoped>

</style>