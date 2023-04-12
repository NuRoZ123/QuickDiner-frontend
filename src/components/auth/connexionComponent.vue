<template>
  <div class="flex flex-col w-[600px] h-[420px] items-center shadow border border-gray-200 py-10">
      <span class="text-2xl font-bold mb-6">Se connecter</span>

      <div class="flex flex-col w-[560px] my-auto">
          <label class="font-bold" for="email">Email</label>
          <input class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" type="email" id="email" placeholder="email">
          <label class="font-bold" for="password">Mot de passe</label>
          <input class="px-2 py-1 w-full rounded-md mb-6 border-gray-300 border" type="password" id="password" placeholder="password">
      </div>

      <button class="rounded-3xl w-[560px] py-2 bg-black text-white" type="submit">Login</button>

  </div>
</template>

<script setup>
</script>

<style scoped>

</style>