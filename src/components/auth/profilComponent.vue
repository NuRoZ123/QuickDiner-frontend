<template>
    <div class="flex flex-col w-[600px] h-[420px] justify-center items-center shadow border border-gray-200 py-10">
        <span class="text-2xl font-bold mb-6">Profil du compte</span>

        <div class="flex mb-6 w-[560px] justify-between items-center">
            <div class="flex flex-col">
                <label class="font-bold" for="name">Nom</label>
                <input class="w-60 px-2 py-1 rounded-md border-gray-300 border" type="text" id="name" placeholder="nom" v-model="user.nom">
            </div>
            <div class="flex flex-col">
                <label class="font-bold" for="lastname">Prenom</label>
                <input class="w-60 px-2 py-1 rounded-md border-gray-300 border" type="text" id="lastname" placeholder="prenom" v-model="user.prenom">
            </div>
        </div>

        <div class="flex flex-col w-[560px]">
            <label class="font-bold" for="email">Email</label>
            <input class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" id="email" type="email" placeholder="email" v-model="user.email">
        </div>


        <div class="flex mb-6 w-[560px] justify-between items-center">
            <div class="flex flex-col">
                <label class="font-bold" for="password">Mot de passe</label>
                <input class="w-60 px-2 py-1 rounded-md border-gray-300 border" id="password" type="password" placeholder="password" v-model="user.password">
            </div>
            <div class="flex flex-col">
                <label class="font-bold" for="confirmPassword">Confirmation du mot de passe</label>
                <input class="w-60 px-2 py-1 rounded-md border-gray-300 border" id="confirmPassword" type="password" placeholder="confirm your password" v-model="user.confirmPassword">
            </div>
        </div>



        <button class="rounded-3xl w-[560px] py-2 bg-black text-white" type="submit" @click="updateUser()">Modifier</button>
    </div>
</template>

<script setup>
import {reactive} from "vue";
import {authStore} from "@/stores/authStore";

const storeAuth = authStore()

const userToken = JSON.parse(JSON.parse(atob(storeAuth.token.split('.')[1])).sub)

const user = reactive({
    nom: userToken.nom,
    prenom: userToken.prenom,
    email: userToken.email,
    password : '',
    confirmPassword : ''
})

const updateUser = () => {
    let userUpdate = {}

    if(user.nom !== userToken.nom) {
        userUpdate = {...userUpdate, nom : user.nom}
    }

    if(user.prenom !== userToken.prenom) {
        userUpdate = {...userUpdate, prenom : user.prenom}
    }

    if(user.email !== userToken.email) {
        userUpdate = {...userUpdate, email : user.email}
    }

    if(user.password === user.confirmPassword) {
        userUpdate = {...userUpdate, password : user.password}
    }

    storeAuth.updateUser(userUpdate)
}
</script>

<style scoped>

</style>