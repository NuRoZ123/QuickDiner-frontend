<script setup>
import {reactive} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {authStore} from "@/stores/authStore";
import {useRoute} from "vue-router";
import {commentaireVoteStore} from "@/stores/commentaireVoteStore";
import {range} from "lodash";

const storeCommentaireVote = commentaireVoteStore()
const storeAuth = authStore()
const route = useRoute()

const commentaireVote = reactive({
    commentaire : '',
    note:0,
})

const setCommentaireNote = (note) => {
    if(note === commentaireVote.note) {
        commentaireVote.note = 0
    } else {
        commentaireVote.note = note
    }
}

const createCommentaire = () => {
    if(commentaireVote.commentaire.length > 0) {
        storeCommentaireVote.createCommentaireVote(route.params.id, commentaireVote)
    }
}
</script>

<template>
  <div class="bg-white w-3/4 h-auto p-4 shadow mt-8 rounded-3xl border border-gray-200">
      <div class="flex flex-col w-auto">
          <div class="flex flex-row justify-between items-center mx-8">
              <div class="flex justify-center items-center">
                  <span class="w-10 h-10 bg-black rounded-3xl text-white mr-4 flex items-center justify-center"><font-awesome-icon class="w-6 h-6" icon="fa-solid fa-user" /></span>
                  <span class="font-bold flex items-center">{{storeAuth.user}}</span>
              </div>

              <div class="w-auto">
                  <font-awesome-icon v-for="i in range(1,6)" :key="i" icon="fa-solid fa-star" :class="i <= commentaireVote.note ? 'text-yellow-300' : 'text-gray-300'" @click="setCommentaireNote(i)"  />
              </div>
          </div>
          <div class="w-auto mx-10 relative">
                <textarea v-model="commentaireVote.commentaire" maxlength="255" id="commentaire" class="flex h-16 my-6 px-2 w-full border border-gray-200 resize-none"></textarea>
                <label class="absolute bottom-2 right-0 text-xs text-gray-500" for="commentaire">{{commentaireVote.commentaire.length}} / 255</label>
          </div>
          <button class="my-1 text-white bg-black rounded-3xl p-2 w-auto mr-8 mx-auto px-4 cursor-pointer" @click="createCommentaire()">Commenter</button>


      </div>
  </div>
</template>

<style scoped>

</style>