import {ref} from "vue";

export {
    toggleMenu,
    panierMenu,
    photon
}

const toggleMenu = ref(false)

const panierMenu = ref(false)

const photon = async (search) => {
    return fetch(`https://photon.komoot.io/api/?q=${search}&limit=5`).then(result => result.json())
}