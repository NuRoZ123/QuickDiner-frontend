<template>
    <div class="flex flex-col w-auto" >
        <label for="ville" class="font-bold">Ville</label>
      <div class="relative">
        <input class="bg-gray-200 rounded-3xl p-2 pl-4 pr-10 w-52" name="ville" type="text" placeholder="Ville..." v-model="storeRestaurants.filter.ville" @focus="focusVisible = true" @blur="hide()">
        <button class="absolute right-4 top-1/2 -translate-y-1/2" @click="storeRestaurants.filter.ville = ''"><font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon></button>
      </div>

      <div class="relative">
        <ul class=" absolute z-[1] shadow max-h-32 overflow-y-auto overflow-x-hidden">
          <li class="border pl-2 py-2 w-52 bg-white flex items-center cursor-pointer" v-for="result in storeRestaurants.filterVilleRestaurant()" :key="result" @click="storeRestaurants.filter.ville = result" v-show="focusVisible">
            <font-awesome-icon class="mx-3" icon="fa-solid fa-map-marker-alt"></font-awesome-icon>
            <span>{{result}}</span>
          </li>
        </ul>
      </div>

    </div>

</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {restaurantsStore} from "@/stores/restaurantsStore";
import {ref} from "vue";


const storeRestaurants = restaurantsStore()

const focusVisible = ref(false)

const hide = () => {
  setTimeout(() => focusVisible.value = false, 200)
}
</script>

<style scoped>

</style>