<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { allTags } from '@/queries';

export default {
  data() {
    return {
      tags: []
    }
  },
  async created() {
    const { data } = await apolloClient.query({
      query: allTags
    })
    this.tags = data?.allTags
  }
}
</script>

<template>
  <div class="flex flex-col place-content-center place-items-center">
    <div class="py-8 border-b-2">
      <h1 class="text-5xl font-extrabold">All Tags</h1>
    </div>
    <div class="flex flex-wrap py-8">
      <router-link
        v-for="tag in tags"
        :key="tag.name"
        class=""
        :to="`/tag/${tag.slug}`"
        >{{ tag.name }}</router-link
      >
    </div>
  </div>
</template>
