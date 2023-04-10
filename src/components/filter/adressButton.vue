<template>
    <div class="flex flex-col mx-5 w-auto">
        <input class="bg-gray-200 rounded-3xl p-2 px-12 w-full" type="text" v-model="query" @input="searchResult()" placeholder="Rechercher..." @focusout="resetSearch" @focusin="searchResult()">
        <ul class="shadow">
            <li class="border pl-2 py-2 flex items-center" v-for="result in results.value" :key="result.id" @click="changeQueryValue(result.properties)">
                <font-awesome-icon class="mx-3" icon="fa-solid fa-map-marker-alt"></font-awesome-icon>
                <span class="flex flex-col">
                    <span>{{ result.properties.housenumber }} {{ result.properties.street }}</span>
                    <span class="text-gray-300">{{ result.properties.city ? result.properties.city : '' }}</span>
                </span>
            </li>
        </ul>
    </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import {photon} from "@/utils";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const query = ref("")
const results = reactive({})

const searchResult = async () => {
    const address = await photon(query.value)
    console.log(address.features)
    results.value = address.features
}

const changeQueryValue = (properties) => {
    query.value = `${properties.housenumber} ${properties.street} ${properties.city ? properties.city : ''}`
    results.value = []
}

const resetSearch = () => {
    results.value = []
}
</script>

<style scoped>

</style>