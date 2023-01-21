<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { postsByTag } from '@/queries';

export default {
  data() {
    return {
      postsByTag: null,
    }
  },
  async created() {
    const { data } = await apolloClient.query({
      query: postsByTag,
      variables: {
        tag: this.$route.params.tag,
      },
    })
    this.postsByTag = data?.postsByTag
  }
}
</script>

<template>
  <div>
    <div v-for="post in postsByTag" :key="post.id">
      {{ post.title }}
      {{ post.createdDate }}
      <div v-html="post.content"></div>
      </div>
  </div>
</template>
