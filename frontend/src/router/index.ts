import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/main/HomeView.vue'
import CategoryView from '../views/main/CategoryView.vue'
import PostView from '../views/main/PostView.vue'
import AllTagsView from '../views/main/AllTagsView.vue'
import TagView from '../views/main/TagView.vue'
import AllCategoriesView from '../views/main/AllCategoriesView.vue'

import SignupView from '../views/user/SignupView.vue'
import LoginView from '../views/user/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: TagView
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: PostView
    },
    {
      path: '/all-tags',
      name: 'all-tags',
      component: AllTagsView
    },
    {
      path: '/all-categories',
      name: 'all-categories',
      component: AllCategoriesView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/main/AboutView.vue')
    }
  ]
})

export default router
