<template>
  <div class="flex w-80 h-full justify-items-center mt-4 flex-col">
    <adress-button></adress-button>
    <prix-moyen-component></prix-moyen-component>
  </div>
</template>

<script setup>
import AdressButton from "@/components/filter/adressButton.vue";
import PrixMoyenComponent from "@/components/filter/prixMoyenComponent.vue";
</script>

<style scoped>

</style>