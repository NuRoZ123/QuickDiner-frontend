<template>
    <div class="flex flex-col ml-5 w-auto mt-5">
      <label for="prixMoyen" class="font-bold">Prix moyen &lt;= </label>
      <input v-model="storeRestaurants.filter.avgPrice" class="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm" type="range" id="prixMoyen" name="prixMoyen" min="0" :max="storeRestaurants.maxPrice">
      <span class="ml-auto">{{storeRestaurants.filter.avgPrice}} €</span>
    </div>

</template>

<script setup>
import {restaurantsStore} from "@/stores/restaurantsStore";

const storeRestaurants = restaurantsStore()
</script>

<style scoped>

</style>