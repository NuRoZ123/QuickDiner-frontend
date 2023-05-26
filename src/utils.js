import {ref} from "vue";

export {
    toggleMenu,
    panierMenu,
    toggleModalDeleteAccount,
    dataGouv,
    getDistance
}

const toggleMenu = ref(false)

const panierMenu = ref(false)

const toggleModalDeleteAccount = ref(false)

// const photon = async (search) => {
//     return fetch(`https://photon.komoot.io/api/?q=${search}&limit=5`).then(result => result.json())
// }

const dataGouv = async(search) => {
    if (encodeURIComponent(search.length) > 3) {
        return fetch(`https://api-adresse.data.gouv.fr/search/?q=${search}`,
            {
                method: 'GET',
            }).then(result => result.json())
    }
}

const getDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371; // Rayon moyen de la Terre en kilomètres
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
}

const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}