import { createRouter, createWebHistory } from 'vue-router'
import firstPage from '../views/firstPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: firstPage,
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main.vue'),
  },
  {
    path: '/editturn',
    name: 'editturn',
    component: () => import('../views/editTurn.vue')
  },
  {
    path: '/turn/:id',
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
