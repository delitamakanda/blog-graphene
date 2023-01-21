<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { createComment } from '@/mutations';
import CommentSingle from '@/components/CommentSingle.vue'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    CommentSingle,
  },
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
    }
      
  },
  data() {
    return {
      content: '',
      isSubmitted: false,
      user: {
        isLoggedIn: false,
        token: (this as any).userStore.getToken || '',
        info: (this as any).userStore.getUser || {}
      }
    }
  },
  props: {
    postID: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    authorID: {
      type: String,
      required: false,
    }
  },
  async created() {
    if (this.user.token) {
      this.user.isLoggedIn = true
    }
  },
  methods: {
    async submit() {
      if (this.content) {
        apolloClient.mutate({
          mutation: createComment,
          variables: {
            content: this.content,
            authorID: this.authorID,
            postID: this.postID,
          }
        }).then(() => this.isSubmitted = true)
      }
    }
  }
}
</script>

<template>
  <div>
    <p class="font-bold text-2xl">Comments:</p>

    <!-- If the user is not authenticated -->
    <div v-if="!user.isLoggedIn">
      You need to
      <router-link to="/login">sign in</router-link>
      before you can leave your comment.
    </div>

    <!-- If the user is authenticated -->
    <div v-else>
      <div v-if="isSubmitted" class="">
        Your comment will show up here after is has been approved.
      </div>
      <form action="POST" @submit.prevent="submit">
        <textarea type="text" rows="5" v-model="content" />

        <button>Submit Comment</button>
      </form>
    </div>

    <!-- List all comments -->
    <comment-single
      v-for="comment in comments"
      :key="comment?.id"
      :comment="comment"
      :authorID="authorID"
    >
    </comment-single>
  </div>
</template>
