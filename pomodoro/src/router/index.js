import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'POMODORO'
    }
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings.vue'),
    meta: {
      title: 'POMODORO | Settings'
    },
    children: [
      {
        path: 'TODOLIST',
        name: 'TODOLIST',
        component: () => import(/* webpackChunkName: "TODOLIST" */ '../views/TODOLIST.vue'),
        meta: {
          title: 'POMODORO | TODOLIST'
        }
      },
      {
        path: 'ANALYTICS',
        name: 'ANALYTICS',
        component: () => import(/* webpackChunkName: "ANALYTICS" */ '../views/ANALYTICS.vue'),
        meta: {
          title: 'POMODORO | ANALYTICS'
        }
      },
      {
        path: 'RINGTONES',
        name: 'RINGTONES',
        component: () => import(/* webpackChunkName: "RINGTONES" */ '../views/RINGTONES.vue'),
        meta: {
          title: 'POMODORO | RINGTONES'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
