<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <div class="mx-auto mt-16">
            <profil-component></profil-component>
            <button type="button" class="rounded-3xl w-full py-2 bg-red-500 text-white mx-auto mt-8" @click="openModalDeleteAccount()">Supprimer le compte</button>
        </div>

    </div>
</template>

<script setup>
import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import ProfilComponent from "@/components/auth/profilComponent.vue";
import {toggleModalDeleteAccount} from "@/utils";


const openModalDeleteAccount = () => {
    toggleModalDeleteAccount.value = true
}
</script>

<style scoped>

</style>