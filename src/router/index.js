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
    name: 'auth',
    component: () => import('../views/auth.vue'),
  },
  {
    path: '/type',
    name: 'type',
    component: () => import('../views/type.vue'),
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
    path: '/main',
    name: 'main',
    component: () => import('../views/main.vue'),
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
  // {
  //   path: '/auth',
  //   name: 'auth',
  //   component: () => import('../views/auth.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
