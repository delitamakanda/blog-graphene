<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { postBySlug } from '@/queries';

export default {
  data() {
    return {
      post: null,
    }
  },
  async created() {
    const { data } = await apolloClient.query({
      query: postBySlug,
      variables: {
        slug: this.$route.params.slug,
      },
    })
    this.post = data?.postBySlug
  }
}
</script>

<template>
  <div>
    <h1>
      {{ post?.title }}}
    </h1>

    <div v-html="post?.content"></div>
    <p>
      {{ post?.createdDate }}
    </p>
  </div>
</template>
