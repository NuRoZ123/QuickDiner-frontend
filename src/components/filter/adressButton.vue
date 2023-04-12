<template>
    <div class="flex flex-col ml-5 w-auto">
        <input class="bg-gray-200 rounded-3xl p-2 px-4 w-full" type="text" v-model="query" @input="searchResult()" placeholder="Adresse...">
        <ul class="shadow">
            <li class="border pl-2 py-2 flex items-center cursor-pointer" v-for="result in results.value" :key="result.id" @click="changeQueryValue(result.properties)" v-show="result.properties.housenumber || result.properties.street || result.properties.city">
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
    results.value = address.features
}

const changeQueryValue = (properties) => {
    query.value = `${properties.housenumber ? ' '+properties.housenumber : '' }${properties.street ? ' '+properties.street : ''}${properties.city ? ' '+properties.city : ''}`
    console.log(query)
    results.value = []
}
</script>

<style scoped>

</style>