<template>
    <div class="flex flex-col w-[600px] h-[420px] justify-center items-center shadow border border-gray-200 py-10 overflow-hidden">

        <span class="text-2xl font-bold mb-6">Créer un compte</span>

        <div class="h-auto overflow-y-auto">
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

            <div class="flex flex-col w-[560px]">

                <label class="font-bold" for="typeOfAccount">Type de compte</label>
                <select v-model="typeAccount" class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" id="typeOfAccount">
                    <option v-for="typeAccount in storeAuth.typeOfAccount" :key="typeAccount" :value="typeAccount">{{typeAccount}}</option>
                </select>
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

            <div v-if="typeAccount === 'Commercant'" class="flex flex-col">
                <label class="font-bold" for="imageRestaurant">Information sur le restaurant</label>
                <div class="flex w-[560px] relative">
                    <div class="w-40 h-40">
                      <img class="absolute z-[1] w-40 h-40" :src="restaurant.image" alt="image-du-produit" @load="imageLoaded = true">
                      <div v-show="!imageLoaded" class="absolute bg-gray-300 w-40 h-40 justify-center items-center flex"><font-awesome-icon class="w-12 h-12 text-white" icon="fa-solid fa-plus"></font-awesome-icon></div>
                    </div>
                    <input type="file" accept="image/*" class="absolute z-[2] cursor-pointer opacity-0 w-40 h-40" @change="updateImage">
                    <div class="flex flex-col w-[300px] mx-auto">
                        <input class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" id="nomRestaurant" type="text" placeholder="Nom du restaurant" v-model="restaurant.nom">
                        <input class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" id="adresseRestaurant" type="text" placeholder="Adresse du restaurant" v-model="restaurant.adresse">
                        <input class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" id="villeRestaurant" type="text" placeholder="Ville du restaurant" v-model="restaurant.ville">
                    </div>
                </div>


            </div>
        </div>

        <button class="rounded-3xl w-[560px] py-2 bg-black text-white" type="submit" @click="saveUser()">S'enregistrer</button>

    </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import {authStore} from "@/stores/authStore";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const storeAuth = authStore()

storeAuth.getTypeOfAccount()

const user = reactive({
    nom : '',
    prenom : '',
    email : '',
    password : '',
    confirmPassword : ''
})

const typeAccount = ref("Client")

const restaurant = reactive({
    nom: '',
    adresse: '',
    image: '',
    ville : '',
})

const updateImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
        restaurant.image = reader.result
    }

    reader.readAsDataURL(file)
}

const imageLoaded = ref(false)

const saveUser = async () => {

    storeAuth.resetErrors()

    if (!user.nom) {
        storeAuth.pushErrors("Renseignez votre nom")
    }

    if (!user.prenom) {
        storeAuth.pushErrors("Renseignez votre prenom")

    }

    if (!user.email) {
        storeAuth.pushErrors("Renseignez votre email")

    }

    if (!user.password) {
        storeAuth.pushErrors("Renseignez votre mot de passe")
    }

    if (!user.confirmPassword) {
        storeAuth.pushErrors("Renseignez la confirmation du mot de passe")
    }

    if(user.password !== user.confirmPassword) {
        storeAuth.pushErrors("Les mots de passe ne correspondent pas")
    }

    if (typeAccount.value === 'Commercant') {
        if(!restaurant.nom) {
            storeAuth.pushErrors("Renseignez le nom du restaurant")
        }

        if(!restaurant.adresse) {
            storeAuth.pushErrors("Renseignez l'adresse du restaurant")
        }

        if(!restaurant.image) {
            storeAuth.pushErrors("Renseignez l'image du restaurant")
        }

      if(!restaurant.ville) {
        storeAuth.pushErrors("Renseignez la ville du restaurant")
      }
    }

    if (storeAuth.errors.length === 0) {
        delete user.confirmPassword
        const registerUser = {utilisateur : user, restaurant: restaurant ,type: typeAccount.value}

        let error;

        if(typeAccount.value === 'Commercant') {
            error = await storeAuth.register(registerUser)
        } else {
            delete registerUser.restaurant
            error = await storeAuth.register(registerUser)
        }

        if(!error) {
            setTimeout(storeAuth.resetErrors , 2000)
        }
    } else {
        setTimeout(storeAuth.resetErrors , 2000)
    }
}


</script>

<style scoped>

</style>