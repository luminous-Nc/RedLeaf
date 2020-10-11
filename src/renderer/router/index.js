import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/Homepage').default
    },
    {
      path:'/watch',
      name: 'path-watch',
      component: require('@/components/fileWatcher').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
