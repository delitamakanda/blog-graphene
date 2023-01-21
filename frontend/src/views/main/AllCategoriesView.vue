<script lang="ts">

export default {
  data() {
    return {
      catogories: []
    }
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
        class=". . ."
        :to="`/category/${category.slug}`"
        >{{ category.name }}</router-link
      >
    </div>
  </div>
</template>

/*
https://www.ericsdevblog.com/posts/create-a-modern-application-with-django-and-vue-2/
*/