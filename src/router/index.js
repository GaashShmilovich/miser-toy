import { createRouter, createWebHashHistory } from 'vue-router'
import ToyIndex from '../views/ToyIndex.vue'
import ToyEdit from '../views/ToyEdit.vue'
import ToyDetails from '../views/ToyDetails.vue'
import HomePage from '../views/HomePage.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/toy',
      name: 'toy',
      component: ToyIndex,
      children: [
        {
          path: 'edit/:toyId?',
          component: ToyEdit
        },
        {
          path: 'details/:toyId',
          component: ToyDetails
        },
      ]
    },
  ]
})

export default router
