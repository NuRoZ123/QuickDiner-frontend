<template>
    <div class="flex flex-col w-auto justify-center">
      <label for="rating" class="font-bold my-1">Mieux notées</label>
      <div class="flex flex-col">
        <div v-for="i in range(0, 5)" :key="i">
          <input class="mr-4" type="radio" name="rating" @change="updateButton(i)" :checked="storeRestaurants.filter.note === i">
          <font-awesome-icon v-for="j in range(1,6)" :key="j" icon="fa-solid fa-star" :class="j-1 < i ? 'text-yellow-300' : 'text-gray-300'"  />
          <span class="ml-4">& plus</span>
        </div>

      </div>
    </div>

</template>

<script setup>

import {range} from "lodash";
import {restaurantsStore} from "@/stores/restaurantsStore";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const storeRestaurants = restaurantsStore()

const updateButton = (id) => {

  storeRestaurants.filter.note = id
}
</script>

<style scoped>

</style>