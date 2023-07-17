import { createRouter, createWebHashHistory } from 'vue-router'
import ToyIndex from '../views/ToyIndex.vue'
import ToyEdit from '../views/ToyEdit.vue'
import ToyDetails from '../views/ToyDetails.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/toy'
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
