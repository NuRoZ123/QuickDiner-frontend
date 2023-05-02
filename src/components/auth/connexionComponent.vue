<template>
  <div class="flex flex-col w-[600px] h-[420px] items-center shadow border border-gray-200 py-10">
      <span class="text-2xl font-bold mb-6">Se connecter</span>

      <div class="flex flex-col w-[560px] my-auto">
          <label class="font-bold" for="emailLogin">Email</label>
          <input v-model="user.email" class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" type="emailLogin" id="email" placeholder="email">
          <label class="font-bold" for="passwordLogin">Mot de passe</label>
          <input v-model="user.password" class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" type="password" id="passwordLogin" placeholder="password">
      </div>

      <button class="rounded-3xl w-[560px] py-2 bg-black text-white" type="submit" @click="loginUser()">Login</button>

  </div>
</template>

<script setup>
import {reactive} from "vue";
import {authStore} from "@/stores/authStore";
import {panierStore} from "@/stores/panierStore";
import {useRouter} from "vue-router";

const storeAuth = authStore()
const storePanier = panierStore()

const router = useRouter()

const user = reactive({
    email : '',
    password : '',
})

const loginUser = async () => {

    storeAuth.resetErrors()

    if (!user.email) {
        storeAuth.pushErrors("Renseignez votre email")
    }

    if (!user.password) {
        storeAuth.pushErrors("Renseignez votre mot de passe")
    }

    if(user.password && user.email){
        await storeAuth.authenticate(user)
    }

    if(storeAuth.errors.length === 0) {
        if(storeAuth.token) {
            if(storeAuth.role === 'Client') {
                await storePanier.getPanierUserConnected()
            }
            await router.push('/')
        }
    } else {
        setTimeout(storeAuth.resetErrors , 2000)
    }
}

</script>

<style scoped>

</style>