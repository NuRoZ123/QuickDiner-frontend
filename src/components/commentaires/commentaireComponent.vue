<script setup>
import {defineProps} from 'vue'
defineProps(['commentaire'])
</script>

<template>
  <div >
    {{commentaire}}
  </div>
</template>

<style scoped>

</style>