<script setup>
import {defineProps} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {range} from "lodash";
defineProps(['commentaire'])
</script>

<template>
  <div class="bg-white w-3/4 h-auto p-4 shadow mt-8 rounded-3xl border border-gray-200">
      <div class="flex justify-between mx-8 items-center w-auto">
          <div class="flex justify-center items-center">
              <span class="w-10 h-10 bg-black rounded-3xl text-white mr-4 flex items-center justify-center"><font-awesome-icon class="w-6 h-6" icon="fa-solid fa-user" /></span>
              <span class="font-bold flex items-center">{{commentaire.nomUtilisateur.toLowerCase()}}</span>
          </div>
          <div class="w-auto">
              <font-awesome-icon v-for="i in range(1,6)" :key="i" icon="fa-solid fa-star" :class="i-1 < commentaire.note ? 'text-yellow-300' : 'text-gray-300'"  />
          </div>
      </div>
      <div class="ml-8 whitespace-pre-line">
          {{commentaire.commentaire}}
      </div>
  </div>
</template>

<style scoped>

</style>