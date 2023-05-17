<template>
    <div class="flex flex-col h-full overflow-hidden">
        <navbar-component></navbar-component>
        <div class="h-auto overflow-y-auto">
            <restaurant-component-menu :restaurant="storeRestaurant.restaurant"></restaurant-component-menu>
            <div class="flex flex-col justify-evenly mt-8 justify-around">
                <div v-for="typeMenu in storeMenu.getTypeParRestaurant()" :key="typeMenu" class="mt-8">
                    <span class="font-bold text-2xl ml-4">{{typeMenu}} : </span>
                    <div class="flex flex-wrap justify-around">
                        <menu-component v-for="menu in storeMenu.menus" :key="menu.id" :menu="menu" v-show="menu.typeProduit === typeMenu"></menu-component>

                    </div>

                </div>
            </div>

            <span class="text-3xl flex w-full justify-center items-center my-4">Commentaires</span>

            <div class="h-auto w-full flex flex-col justify-center items-center mt-16">
                <commentaire-modif-component v-if="storeAuth.role === 'Client'"></commentaire-modif-component>
                <commentaire-component v-for="commentaireVote of storeCommentaireVote.commentaires" :key="commentaireVote" :commentaire="commentaireVote"></commentaire-component>
            </div>



        </div>
    </div>
</template>

<script setup>
import {menuStore} from "@/stores/menusStore"
import {useRoute} from "vue-router";
import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import MenuComponent from "@/components/menu/menuComponent.vue";
import {restaurantsStore} from "@/stores/restaurantsStore";
import RestaurantComponentMenu from "@/components/restaurant/restaurantComponentMenu.vue";
import CommentaireComponent from "@/components/commentaires/commentaireComponent.vue";
import {commentaireVoteStore} from "@/stores/commentaireVoteStore";
import CommentaireModifComponent from "@/components/commentaires/commentaireModifComponent.vue";
import {authStore} from "@/stores/authStore";
const storeMenu = menuStore()
const storeRestaurant = restaurantsStore()
const storeCommentaireVote = commentaireVoteStore()
const storeAuth = authStore()
const route = useRoute()

storeMenu.typeMenu = []
storeMenu.menus = []
storeMenu.getAllMenu(route.params.id).then(
    () => storeMenu.getAllTypeOfMenus()
)
storeRestaurant.getRestaurant(route.params.id)
storeCommentaireVote.getAllCommentaires(route.params.id)



</script>

<style scoped>

</style>