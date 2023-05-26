<template>
    <div class="flex flex-col w-auto">
      <div class="relative">
        <input class="bg-gray-200 rounded-3xl p-2 pl-4 pr-10 w-52" type="text" v-model="query" @input="searchResult()" placeholder="Adresse..." @focus="focusVisible = true" @blur="hide()">
        <button class="absolute right-4 top-1/2 -translate-y-1/2" @click="resetAdresse()"><font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon></button>
      </div>
        <div class="relative">
          <ul class="absolute z-[1] shadow max-h-32 overflow-y-auto overflow-x-hidden" v-show="focusVisible">
            <li class="border pl-2 py-2 w-52 bg-white flex items-center cursor-pointer" v-for="result in results.value" :key="result.id" @click="changeQueryValue(result)" v-show="result.properties.housenumber || result.properties.street || result.properties.city">
              <font-awesome-icon class="mx-3" icon="fa-solid fa-map-marker-alt"></font-awesome-icon>
              <span class="flex flex-col">
                    <span>{{ result.properties.housenumber }} {{ result.properties.street }}</span>
                    <span class="text-gray-300">{{ result.properties.city ? result.properties.city : '' }}</span>
                </span>
            </li>
          </ul>
        </div>
    </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import {dataGouv} from "@/utils";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {restaurantsStore} from "@/stores/restaurantsStore";

const storeRestaurants = restaurantsStore()

const query = ref("")
const results = reactive({})
const focusVisible = ref(false)

const searchResult = async () => {
    const address = await dataGouv(query.value)
    if(address) {
      results.value = address.features
    }
}

const resetAdresse = () => {
  storeRestaurants.resetAdresse()
  query.value = ''
}

const hide = () => {
  setTimeout(() => focusVisible.value = false, 200)
}

const changeQueryValue = (result) => {
    query.value = `${result.properties.housenumber ? ' '+result.properties.housenumber : '' }${result.properties.street ? ' '+result.properties.street : ''}${result.properties.city ? ' '+result.properties.city : ''}`
    storeRestaurants.adresse = result
    storeRestaurants.updateKmRestaurants()
    results.value = []
}
</script>

<style scoped>

</style>