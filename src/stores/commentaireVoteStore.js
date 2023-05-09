import {defineStore} from "pinia";

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
        }
    }
})

export {
    commentaireVoteStore
}