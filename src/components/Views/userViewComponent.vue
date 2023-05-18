<template>
    <div class="flex flex-col h-full overflow-hidden">
        <navbar-component></navbar-component>
        <div class="mx-auto mt-16 overflow-y-auto">
            <profil-component></profil-component>
            <restaurant-user-modification-component v-if="storeAuth.role === 'Commercant'"></restaurant-user-modification-component>
            <button type="button" class="rounded-3xl w-full py-2 bg-red-500 text-white mx-auto mt-8" @click="openModalDeleteAccount()">Supprimer le compte</button>
        </div>

    </div>
</template>

<script setup>
import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import ProfilComponent from "@/components/auth/profilComponent.vue";
import {toggleModalDeleteAccount} from "@/utils";
import RestaurantUserModificationComponent from "@/components/auth/restaurantUserModificationComponent.vue";
import {authStore} from "@/stores/authStore";

const storeAuth = authStore()

const openModalDeleteAccount = () => {
    toggleModalDeleteAccount.value = true
}
</script>

<style scoped>

</style>