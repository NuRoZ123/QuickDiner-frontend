<script setup>
import {authStore} from "@/stores/authStore";

const storeAuth = authStore()

</script>

<template>
<div class="mx-auto bg-red-500 p-2 rounded-3xl w-96 mt-4 flex items-center justify-center">
  <ul>
      <li v-for="error in storeAuth.errors" :key="error">{{error}}</li>
  </ul>
</div>
</template>

<style scoped>


</style>