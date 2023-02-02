import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: 'recommend',
      meta:{
        keepAlive: true
      },
      children:[
        {
          path: 'recommend',
          name: 'recommend',
          component: () => import('../views/Home/Recommend.vue')
        },
        {
          path: 'classify',
          name: 'classify',
          component: () => import('../views/Home/Classify.vue')
        },
        {
          path: 'bangdan',
          name: 'bangdan',
          component: () => import('../views/Home/BangDan.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/Discover/AboutView.vue'),
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: () => import('../views/BookShelf/BookShelf.vue'),
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User/UserView.vue'),
      meta:{
        keepAlive: true
      },
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/Detail/Detail.vue'),
      meta:{
        keepAlive: false
      }
    },
    {
      path: '/Chapter',
      name: 'Chapter',
      component: () => import('../views/Detail/Chapter.vue'),
      meta:{
        keepAlive: false
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Home/SearchView.vue'),
      meta:{
        keepAlive: false
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/User/HistoryView.vue'),
      beforeEnter:(to,form,next)=>{
        if (!localStorage.getItem('user')) {
          if (to.name == "/history") {
            next();
          } else {
            router.push('/login')
          }
        } else {
          next();
        }
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/User/favorites.vue'),
      beforeEnter:(to,form,next)=>{
        if (!localStorage.getItem('user')) {
          if (to.name == "/history") {
            next();
          } else {
            router.push('/login')
          }
        } else {
          next();
        }
      }
    },
    {
      path: '/barrage',
      name: 'barrage',
      component: () => import('../views/User/barrage.vue'),
      beforeEnter:(to,form,next)=>{
        if (!localStorage.getItem('user')) {
          if (to.name == "/history") {
            next();
          } else {
            router.push('/login')
          }
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/User/Login.vue')
    }
  ]
})

export default router
