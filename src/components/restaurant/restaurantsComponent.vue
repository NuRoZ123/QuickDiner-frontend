<template>
  <div class="w-full flex flex-wrap ml-12 h-full overflow-y-scroll ">
      <restaurant-component v-for="i in 20" :key="i"></restaurant-component>
  </div>
</template>

<script setup>
import RestaurantComponent from "@/components/restaurant/restaurantComponent.vue";
</script>

<style scoped>

</style>