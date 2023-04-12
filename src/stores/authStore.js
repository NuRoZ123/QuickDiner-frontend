import {defineStore} from "pinia";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const authStore = defineStore('authStore', {
    states : () => ({
        token : ""
    }),
    actions : {
        async register (user) {
            await fetch(`${apiUrl}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body : JSON.stringify(user)
            })
                .then(result => console.log(result))
        }
    }
})

export {
    authStore
}