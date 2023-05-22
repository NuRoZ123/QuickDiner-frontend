<template>
  <div class="flex w-80 h-full items-center mt-4 flex-col">
    <div class="flex flex-col items-center">
      <span class="text-xl my-2">Lieu</span>
      <hr class="h-px w-40 bg-gray-200 border-0 mb-4">
      <adress-button></adress-button>
    </div>
    <div class="flex flex-col items-center mt-6">
      <span class="text-xl my-2">Restaurant</span>
      <hr class="h-px w-40 bg-gray-200 border-0 mb-4">
    </div>
    <div>
      <prix-moyen-component></prix-moyen-component>
      <note-component></note-component>
    </div>

  </div>
</template>

<script setup>
import AdressButton from "@/components/filter/adressButton.vue";
import PrixMoyenComponent from "@/components/filter/prixMoyenComponent.vue";
import NoteComponent from "@/components/filter/noteComponent.vue";
</script>

<style scoped>

</style>