<template>
    <div class="flex flex-col w-auto justify-center">
      <label for="prixMoyen" class="font-bold my-1">distance des restaurants</label>
      <div class="flex flex-row items-center justify-center">
        <input v-model="storeRestaurants.filter.km" class="w-40 h-1 mr-4 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm" type="range" id="km" name="km" min="0" :max="_.round(storeRestaurants.km)" step="10">
        <span class="">{{storeRestaurants.filter.km}} km</span>
      </div>

    </div>

</template>

<script setup>
import _ from 'lodash'
import {restaurantsStore} from "@/stores/restaurantsStore";

const storeRestaurants = restaurantsStore()
</script>

<style scoped>

</style>