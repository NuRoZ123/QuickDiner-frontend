<template>
  <div  class="w-full flex flex-wrap ml-12 h-full overflow-y-auto">
      <restaurant-component v-show="storeRestaurants.filterRestaurant().length > 0" v-for="restaurant of storeRestaurants.filterRestaurant()" :key="restaurant.id" :restaurant="restaurant"></restaurant-component>
      <span class="text-3xl font-bold m-auto" v-show="storeRestaurants.filterRestaurant().length === 0">Il n'y a pas de restaurants dans cette ville pour le moment</span>
  </div>
</template>

<script setup>
import RestaurantComponent from "@/components/restaurant/restaurantComponent.vue";
import {restaurantsStore} from '@/stores/restaurantsStore'
const storeRestaurants = restaurantsStore()
storeRestaurants.getRestaurants()

</script>

<style scoped>

</style>