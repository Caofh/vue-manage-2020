/* eslint-disable */

/*
  1.跳转：
    get参数
    this.$router.push({
      name: 'answerDetail',
      query: {
        userId: 666
      }
    })
    组件方法：
    import { pushPage } from '@/utils'
    pushPage(this, {
      name: 'answerDetail',
      query: {
        userId: 666
      }
    })

    post参数
    this.$router.push({
      name: 'answerDetail',
      params: {
        userId: 666
      }
    })
    组件方法：
    import { pushPage } from '@/utils'
    pushPage(this, {
      name: 'answerDetail',
      params: {
        userId: 666
      }
    })

  2.获取参数：
    this.$route.query.userId
    this.$route.params.userId
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { check } from './check'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/adminfront', // nginx配置反向代理，域名后面配了什么就设置什么
  mode: 'history',
  routes
})

// 路由前置守卫，在载入前
router.beforeEach((to, from, next) => {
  // console.log('---')
  // console.log(to)

  // **此方法用作扩展，所有页面都会执行这个方法，所有页面的路由守卫，在页面载入前的校验，通过校验，才会进入当前页面的模版组件
  if (!check(to, router)) return

  // 设置面包屑逻辑
  setBread(to)

  next()

})

// 路由后置守卫，在载入后
router.afterEach((route) => {
  // console.log('---')
  // console.log(route)

})

function setBread (to) {
  let $store = router.app.$options.store
  // console.log(router)

  let routes = router.app.$options.store.state.routes
  let visitedRoutes = router.app.$options.store.state.visitedRoutes
  // console.log(routes)
  // console.log(visitedRoutes)
  // console.log(router.options.routes)

  // 侧边栏面包屑
  if (!routes.length) {
    let routes = router.options.routes[1].children.filter(item => item.name)
    $store.dispatch("setRouters", routes);
  }

  // 更换meta的title页面名称
  setMetaTitle(to)

  // 上方面包屑
  let currName = to['name']
  let mark = visitedRoutes.filter(item => item.name && item.name === currName)
  if (!mark.length) {
    visitedRoutes.push(to)
  }
  $store.dispatch("setVisitedRoutes", visitedRoutes);

}

// 更换meta的title页面名称
function setMetaTitle (to) {
  // console.log(to)

  let name = to.name
  let query = to.query
  
  if (name === 'groupCreate') {
    if (query.type == 2) {
      to.meta.title = '编辑小组'
    } else {
      to.meta.title = '创建小组'
    }

  }


}


export default router
