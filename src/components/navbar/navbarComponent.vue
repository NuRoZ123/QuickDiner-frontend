<script setup>
import {reactive} from "vue";
import {toggleMenu} from "@/utils";
import {useRoute} from "vue-router";
const listOfMenus = reactive([])

const route = useRoute()
</script>

<template>
  <nav class="grid grid-cols-8 gap-4 h-20 flex items-center justify-center">
      <div class="col-start-1 flex justify-center items-center">
          <div class="rounded-3xl hover:bg-gray-200 w-10 h-10 flex flex-col justify-center items-center cursor-pointer" @click="toggleMenu = true">
              <div class="w-6 border border-black"></div>
              <div class="w-6 border border-black mt-2"></div>
              <div class="w-6 border border-black mt-2"></div>
          </div>
      </div>
      <div v-if="route.name !== 'authentification'" class="col-start-2 ">
          <button class="bg-gray-200 rounded-3xl p-2 px-4">Connexion</button>
      </div>
      <div v-if="route.name === 'home'" class="relative col-start-3 col-end-7">
          <input type="text" class="bg-gray-200 rounded-3xl p-2 px-12 w-full" placeholder="Rechercher...">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute top-1/2 left-4 -translate-y-1/2"></font-awesome-icon>
      </div>
      <div v-if="route.name === 'home'" class="col-start-8 flex items-center justify-between relative">
          <button type="button" class="text-white bg-black rounded-3xl p-2 w-full mr-8"><font-awesome-icon icon="fa-solid fa-basket-shopping" class="mr-2"></font-awesome-icon>Panier</button>
          <span v-if="listOfMenus.length" class="ml-4 rounded-3xl bg-white text-black w-6 h-6 absolute flex justify-center items-center right-5 top-2">{{listOfMenus.length}}</span>
      </div>
  </nav>
</template>

<style scoped>

</style>