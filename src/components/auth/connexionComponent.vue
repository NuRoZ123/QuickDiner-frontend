<template>
  <div class="flex flex-col w-[600px] h-[420px] items-center shadow border border-gray-200 py-10">
      <span class="text-2xl font-bold mb-6">Se connecter</span>

      <div class="flex flex-col w-[560px] my-auto">
          <label class="font-bold" for="emailLogin">Email</label>
          <input v-model="user.email" class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" type="emailLogin" id="email" placeholder="email">
          <label class="font-bold" for="passwordLogin">Mot de passe</label>
          <input v-model="user.password" class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" type="password" id="passwordLogin" placeholder="password">
      </div>

      <router-link :to="{ name: 'home'}"><button class="rounded-3xl w-[560px] py-2 bg-black text-white" type="submit" @click="loginUser()">Login</button></router-link>

  </div>
</template>

<script setup>
import {reactive} from "vue";
import {authStore} from "@/stores/authStore";

const storeAuth = authStore()

const user = reactive({
    email : '',
    password : '',
})

const loginUser = async () => {
    await storeAuth.authenticate(user)
}

</script>

<style scoped>

</style>