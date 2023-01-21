<script lang="ts">
import PostList from '@/components/PostList.vue'
import { apolloClient } from '@/apollo-config'
import { postsByCategory } from '@/queries'

export default {
  components: {
    PostList,
  },
  data() {
    return {
      postsByCategory: null,
    }
  },
  async created() {
    const { data } = await apolloClient.query({
      query: postsByCategory,
      variables: {
        category: this.$route.params.category,
      },
    })
    this.postsByCategory = data?.postsByCategory
    
  }
}
</script>

<template>
  <div>
    <div v-for="post in postsByCategory" :key="post.id">
      {{ post.title }}
      {{ post.createdDate }}
      <div v-html="post.content"></div>
      </div>
  </div>
</template>
