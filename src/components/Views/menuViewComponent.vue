<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <restaurant-component-menu :restaurant="storeRestaurant.restaurant"></restaurant-component-menu>
        <div class="flex flex-row justify-evenly flex-wrap mt-8">
            <menu-component v-for="menu in storeMenu.menus" :key="menu.id" :menu="menu"></menu-component>
        </div>

    </div>
</template>

<script setup>
import {menuStore} from "@/stores/menusStore"
import {useRoute} from "vue-router";
import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import MenuComponent from "@/components/menu/menuComponent.vue";
import {restaurantsStore} from "../../stores/restaurantsStore";
import RestaurantComponentMenu from "@/components/restaurant/restaurantComponentMenu.vue";
const storeMenu = menuStore()
const storeRestaurant = restaurantsStore()
const route = useRoute()

storeMenu.getAllMenu(route.params.id)
storeRestaurant.getRestaurant(route.params.id)

</script>

<style scoped>

</style>