<template>
    <div class="absolute left-0 top-0 w-full h-screen bg-gray-900 bg-opacity-50 transition-opacity duration-500" v-show="toggleModalDeleteAccount" @click="toggleModalDeleteAccount = false"></div>

    <div class="flex items-center absolute z-10 inset-0 w-1/3 h-28 bg-white m-auto flex-col transform transition duration-500 ease-in-out" :class="{'scale-0': !toggleModalDeleteAccount, 'scale-100': toggleModalDeleteAccount}">
        <span class="flex mt-4">Êtes-vous sûr de vouloir supprimer votre compte ?</span>
        <div class="ml-auto mr-4 mb-4 mt-4">
            <router-link :to="{name : 'home'}" @click="deleteAccount()"><button type="button" class="rounded-3xl w-20 py-2 bg-green-500 text-white">Oui</button></router-link>
            <button type="button" class="ml-4 rounded-3xl w-20 py-2 bg-red-500 text-white" @click="toggleModalDeleteAccount = false">non</button>
        </div>
    </div>
</template>

<script setup>
import {toggleModalDeleteAccount} from "@/utils";
import {authStore} from "@/stores/authStore";

const storeAuth = authStore()

const deleteAccount = () => {
    toggleModalDeleteAccount.value = false
    storeAuth.deleteAccount()
}
</script>

<style scoped>

</style>