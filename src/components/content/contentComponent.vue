<template>
  <div class="flex mt-10 h-full w-full overflow-hidden">
      <filter-component></filter-component>
      <restaurants-component></restaurants-component>

  </div>
</template>

<script setup>
import FilterComponent from "@/components/filter/filterComponent.vue";
import RestaurantsComponent from "@/components/restaurant/restaurantsComponent.vue";
</script>

<style scoped>

</style>