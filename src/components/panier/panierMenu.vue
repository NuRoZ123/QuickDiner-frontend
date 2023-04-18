<template>
    <div class="absolute left-0 top-0 w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-500" v-show="panierMenu" @click="panierMenu = false"></div>
    <div class="absolute top-0 right-0 w-80 h-screen bg-white shadow-lg z-10 transform transition-all duration-500" :class="panierMenu ? 'translate-x-0' : 'translate-x-full'" style="overflow-x: hidden;">
        <font-awesome-icon class="absolute right-4 top-4 w-6 h-6 cursor-pointer hover:bg-gray-200 p-2 rounded-3xl" icon="fa-solid fa-xmark" @click="panierMenu = false"></font-awesome-icon>
    </div>
</template>

<script setup>
import {panierMenu} from "@/utils";
</script>

<style scoped>

</style>