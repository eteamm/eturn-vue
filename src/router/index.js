import { createRouter, createWebHistory } from 'vue-router'
import firstPage from '../views/firstPage.vue'

const routes = [
  {
    path: '/welcome',
    name: 'welcome',
    component: firstPage,
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/main.vue'),
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/editTurn.vue')
  },
  {
    path: '/turn',
    name: 'turn',
    component: () => import('../views/turn.vue'),
    props: true
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('../views/members.vue')
  },

  {
       path: '/create',
       name: 'create',
       component: () => import('../views/create.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
