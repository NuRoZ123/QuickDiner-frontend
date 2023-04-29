<template>
    <div class="flex flex-col h-full">
        <navbar-component></navbar-component>
        <h1 class="font-bold text-center text-3xl">LOGIN / REGISTER</h1>
        <errors-component v-if="storeAuth.errors.length > 0"></errors-component>
        <div class="flex flex-row justify-around items-center w-full my-auto flex-wrap">
            <register-component></register-component>
            <connexion-component></connexion-component>
        </div>
    </div>
</template>

<script setup>
import ConnexionComponent from "@/components/auth/connexionComponent.vue";
import RegisterComponent from "@/components/auth/registerComponent.vue";
import NavbarComponent from "@/components/navbar/navbarComponent.vue";
import ErrorsComponent from "@/components/errors/errorsComponent.vue";
import {authStore} from "@/stores/authStore";

const storeAuth = authStore()
</script>

<style scoped>

</style>