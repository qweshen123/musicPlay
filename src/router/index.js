import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props:true
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/Explore.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue'),
    children:[{
      path: 'login',
      name: 'Login',
      props:true,
      component: () => import('../views/Login.vue'),
    }]
  },

  {
    path: '/songlist',
    name: 'SongList',
    component: () => import('../views/SongList.vue')
  },

  {
    path: '/library',
    name: 'Library',
    props:true,
    component: () => import('../views/Library.vue')
  },

  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },

  
  
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
