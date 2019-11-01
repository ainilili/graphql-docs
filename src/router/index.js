import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css'


import Home from '@/components/Home'
import ApiInfo from '@/components/ApiInfo'

Vue.use(Router)
Vue.use(iView)
Vue.use(ElementUI)


var r = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/info/:name',
          name: 'ApiInfo',
          component: ApiInfo,
        },

      ]
    }
  ]
})

r.beforeEach((to, from, next) => {
  // if(localStorage.getItem("token") || to.name =="Login" || to.name == "Register"){
  //   next()
  // }else{
  //   next({
  //     path:"/Login"
  //   })
  // }
  next();
})

export default r
