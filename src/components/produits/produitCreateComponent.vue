<script setup>
import {reactive} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {produitStore} from "@/stores/produitStore";
import {menuStore} from "@/stores/menusStore";

const storeMenu = menuStore()
storeMenu.getAllTypeOfMenus()

const produit = reactive({
    nom : '',
    image: '',
    prix: '0.01',
    description: '',
    typeProduit: ''
})

const storeProduit = produitStore()
storeProduit.getAllProduits()

const updateImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
        produit.image = reader.result
    }

    reader.readAsDataURL(file)
}

const addProduit = () => {
    if (produit.nom && produit.image && produit.prix && produit.description && produit.typeProduit) {
        storeProduit.addProduit(produit)
        produit.prix = '0.01'
        produit.nom = ''
        produit.description = ''
        produit.image = ''
        produit.typeProduit = ''
    }
}
</script>

<template>
    <div class="flex flex-col shadow h-[380px] w-96 border border-gray-200 items-center mx-4 mt-auto">
        <div class="flex justify-center items-center w-full justify-around h-36">
            <div class="relative w-28 h-28">
                <img :src="produit.image"  alt="image-du-produit" class="absolute w-full h-full">
                <input type="file" accept="image/*" class="absolute opacity-0 w-full h-full" @change="updateImage">

            </div>
            <div class="flex flex-col">
                <label for="name" class="font-bold">Nom du produit</label>
                <input class="px-2 py-1 w-full rounded-md mb-2 border-gray-300 border" type="text" id="name" v-model="produit.nom">
                <label for="prix" class="font-bold">Prix du produit</label>
                <input class="px-2 py-1 w-full rounded-md mb-2 border-gray-300 border" min="0.01" type="number" step="0.01" id="prix" v-model="produit.prix">
            </div>
        </div>
        <div class="flex flex-col w-80">
            <label for="typeMenu" class="font-bold">Type de produit</label>
            <select class="px-2 py-1 w-full rounded-md mb-2 border-gray-300 border" v-model="produit.typeProduit">
              <option v-for="typeProduit of storeMenu.typeMenu" name="typeMenu" :value="typeProduit" :key="typeProduit">{{typeProduit}}</option>
            </select>
            <label class="font-bold" for="textarea">Description</label>
            <textarea class="px-2 py-1 w-full rounded-md mb-2 border-gray-300 border  h-20" v-model='produit.description'></textarea>
        </div>
        <button @click="addProduit()" type="button" class="flex items-center justify-center rounded-3xl w-8 h-8 bg-green-500 text-white ml-auto"><font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon></button>
    </div>
</template>

<style scoped>

</style>