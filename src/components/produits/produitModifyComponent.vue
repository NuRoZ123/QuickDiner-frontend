<script setup>
import {reactive, defineProps, defineEmits} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {produitStore} from "@/stores/produitStore";
import {menuStore} from "@/stores/menusStore";

const storeMenu = menuStore()
storeMenu.getAllTypeOfMenus()
const storeProduit = produitStore()

const emit = defineEmits(['toggleModify'])
const props = defineProps(['produit'])

const produit = reactive({
    nom : props.produit.nom,
    image:  props.produit.image,
    prix:  props.produit.prix,
    description:  props.produit.description,
    typeProduit: props.produit.typeProduit,
    id: props.produit.id
})

const updateImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
        produit.image = reader.result
    }

    reader.readAsDataURL(file)
}

const modifyProduit = () => {
    if (produit.nom && produit.image && produit.prix && produit.description && produit.typeProduit) {
        storeProduit.modifyProduit(produit)
        emit('toggleModify')
    }
}
</script>

<template>
    <div class="flex flex-col p-2 h-[304px] w-96 items-center mx-4">
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
        <div class="flex flex-col w-full">
          <label for="typeMenu" class="font-bold">Type de produit</label>
          <select class="px-2 py-1 w-full rounded-md mb-2 border-gray-300 border" v-model="produit.typeProduit">
            <option v-for="typeProduit of storeMenu.typeMenu" name="typeMenu" :value="typeProduit" :key="typeProduit">{{typeProduit}}</option>
          </select>
            <label class="font-bold" for="textarea">Description</label>
            <textarea class="px-2 py-1 w-full rounded-md mb-2 border-gray-300 border  h-20" v-model='produit.description'></textarea>
        </div>
        <div class="flex items-center justify-end mt-auto ml-auto">
            <button class="rounded-3xl w-8 h-8 bg-red-500 text-white" @click="emit('toggleModify')"><font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon></button>
            <button @click="modifyProduit()" type="button" class="rounded-3xl mx-2 w-8 h-8 bg-green-500 text-white"><font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon></button>
        </div>
    </div>
</template>

<style scoped>

</style>