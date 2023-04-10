<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <content-component></content-component>
    </div>
    <option-menu-component></option-menu-component>
</template>

<script setup>

import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import OptionMenuComponent from "@/components/option-menu/optionMenuComponent.vue";
import ContentComponent from "@/components/content/contentComponent.vue";

</script>

<style>
</style>
