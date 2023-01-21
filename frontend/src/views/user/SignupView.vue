<template>
    <div class="mx-auto h-screen w-full sm:w-2/3 md:w-1/3">
    <form action="POST" @submit.prevent="signup()">
      <div class="bg-white rounded-xl w-full">
        <div class="space-y-4">
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-medium"
              >Username</label
            >
            <input
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              v-model="user.username"
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-medium"
              >Email</label
            >
            <input
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              v-model="user.email"
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-gray-600 font-medium"
              >Password</label
            >
            <input
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              v-model="user.password"
            />
          </div>
        </div>
        <button
          class="mt-4 w-full bg-teal-500 hover:bg-teal-700 focus:ring focus:ring-teal-100 text-white py-2 rounded-md text-lg tracking-wide"
        >
          Sign Up
        </button>
                <div class="text-right">
          <small
            >Already have an account? Try
            <router-link to="/signin" class="text-teal-500 hover:underline"
              >Sign In</router-link
            >
            first.</small
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { userSignup, userLogin } from '@/mutations'
import { apolloClient } from '@/apollo-config'
import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async signup() {
            const { data } = await apolloClient.mutate({
                mutation: userSignup,
                variables: {
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password,
                }
            });
            
            const user = await apolloClient.mutate({
                mutation: userLogin,
                variables: {
                    username: this.user.username,
                    password: this.user.password,
                }
            });

            this.userStore.setToken(user.data.tokenAuth.token);
            this.userStore.setUser(user.data.tokenAuth.user);

        },
    },
}
</script>