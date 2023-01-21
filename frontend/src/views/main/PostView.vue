<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { postBySlug } from '@/queries';
import CommentSection from '@/components/CommentSection.vue'
import { updatePostLike } from '@/mutations';

export default {
  components: {
    CommentSection,
  },
  data() {
    return {
      post: null,
      comments: null,
      userID: null,
      numberOfLikes: 0,
      liked: false,
    }
  },
  computed: {
    isApprouved() {
      return (this as any).comments?.filter((c: any) => c.isApproved)
    },
  },
  async created() {
    const { data } = await apolloClient.query({
      query: postBySlug,
      variables: {
        slug: this.$route.params.slug,
      },
    })
    this.post = data?.postBySlug
    this.comments = data?.postBySlug?.commentSet
    this.userID = JSON.parse(localStorage.getItem('user') as any)?.id

    let likedUsers = (this as any).post.likes
    for(let likedUser of likedUsers) {
      if(likedUser.id === this.userID) {
        this.liked = true
      }
    }
    this.numberOfLikes = +(this as any).post.numberOfLikes.length
  },
  methods: {
    async updateLike() {
      if(this.liked === false) {
        this.liked = true
        this.numberOfLikes += 1
      } else {
        this.liked = false
        this.numberOfLikes -= 1
      }
      await apolloClient.mutate({
        mutation: updatePostLike,
        variables: {
          postId: (this as any).post.id,
          authorId: this.userID,
        },
      })
    },
  },
}
</script>

<template>
  <div>
    <h1>
      {{ post?.title }}
    </h1>

    <div v-html="post?.content"></div>
    <p>
      {{ post?.createdDate }}
    </p>

    <comment-section
    v-if="isApprouved"
    :comments="isApprouved"
    :postID="post?.id"
    :authorID="userID"
    ></comment-section>

    <div v-if="liked === true" @click="updateLike()">
        <i class="fa-solid fa-thumbs-up">
          <span class="font-sans font-semibold ml-1">{{
            numberOfLikes
          }}</span>
        </i>
      </div>
      <div v-else @click="updateLike()">
        <i class="fa-regular fa-thumbs-up">
          <span class="font-sans font-semibold ml-1">{{
            numberOfLikes
          }}</span>
        </i>
      </div>
  </div>
</template>

<!-- 
  https://www.ericsdevblog.com/posts/create-a-modern-application-with-django-and-vue-3/
-->
