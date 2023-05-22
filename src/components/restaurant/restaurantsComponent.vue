<template>
  <div class="w-full flex flex-wrap ml-12 h-full overflow-y-auto">
      <restaurant-component v-for="restaurant of storeRestaurants.filterRestaurant()" :key="restaurant.id" :restaurant="restaurant"></restaurant-component>
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