import {defineStore} from "pinia";
import {authStore} from "@/stores/authStore";

const apiUrl = 'https://quick-diner.k-gouzien.fr'

const commentaireVoteStore = defineStore('commentaireVoteStore', {
    state : () => ({
        commentaires : [],
    }),
    actions : {
        async getAllCommentaires(id) {
            await fetch(`${apiUrl}/api/restaurants/${id}/commentaires`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async (result) => this.commentaires = await result.json())
        },
        async createCommentaireVote(id, commentaireVote) {
            await fetch(`${apiUrl}/api/user/comment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(commentaireVote)
            }).then(async (result) => {
                const res = await result.text()
                if (result.status === 400) {
                    authStore().pushErrors(res)
                }

                if (result.status === 200) {
                    authStore().pushSuccess(res)
                }
                setTimeout(() => authStore().resetErrors(), 2000)
            })
        }
    }
})

export {
    commentaireVoteStore
}