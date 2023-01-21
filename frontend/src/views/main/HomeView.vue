<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { allPosts } from '@/queries';

export default {
  data() {
    return {
      posts: []
    }
  },
  async created() {
    const { data } = await apolloClient.query({
      query: allPosts
    })
    this.posts = data?.allPosts
  }
}
</script>

<template>
  <div v-for="post in posts" :key="post?.id">
    <router-link :to="`/post/${post?.slug}`">
      {{ post?.title }}
      <span v-if="post?.featured" class="featured">featured</span>
      <span v-else class="unfeatured">unfeatured</span>
    </router-link>
    <p>
      {{ post?.createdDate }}
    </p>
  </div>
</template>
