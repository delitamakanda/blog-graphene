<script lang="ts">
import { apolloClient } from '@/apollo-config';
import { allCategories } from '@/queries';


export default {
  data() {
    return {
      catogories: []
    }
  },
  async created() {
    const { data } = await apolloClient.query({
      query: allCategories
    })
    this.catogories = data?.allCategories
  }
}
</script>

<template>
  <div class="flex flex-col place-content-center place-items-center">
    <div class="py-8 border-b-2">
      <h1 class="text-5xl font-extrabold">All Categories</h1>
    </div>
    <div class="flex flex-wrap py-8">
      <router-link
        v-for="category in catogories"
        :key="category.name"
        class=""
        :to="`/category/${category.slug}`"
        >{{ category.name }} {{  category.slug }}</router-link
      >
    </div>
  </div>
</template>
