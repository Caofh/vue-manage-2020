import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// elementUi引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/display.css";
import "@/assets/css/styleExtra/element-variables.scss";
Vue.use(ElementUI, {
  size: "small",
});


// 自定义组件
import 'normalize.css'; // 引用基础兼容性css，normalize.css；文档：https://github.com/necolas/normalize.css
import './assets/css/style/index.scss'; // 引用全局样式类

// 如下为自定义工具函数
import { initAsyn, initAsyn_promise } from '@/utils/loadJs'
import { urlToJson } from '@/utils/common/url_query'
// import { isPC, setRem, cacheRefresh } from '@/utils/index'

// cacheRefresh.init()

const env = process.env.VUE_APP_ENV  // 当前构建的环境变量(development、test、production)
const debug = urlToJson().paramJson.openDebug ? true : false // 线上url后缀带有openDebug=1时，也会开启console看板和性能调试

const productionTip = (env === 'production' && !debug) ? false : true // 生产环境下且url上不带有openDebug=1参数时，关闭vue性能提示

let sourceArr = ['moment'] // vant的cdn路径、飞书sdk

// window.Vue = Vue // 关键代码，兼容cdn模式引入vant，将模块化的vue挂在到window上，兼容vant的cdn模式引入方案；

// 为了在vue实例化之前先加载某些依赖，第一个参数为[]时，直接执行回掉；否则，先加载js，加载完成后执行回掉；
initAsyn(sourceArr, () => {
  // window.Vant = window.vant

  Vue.config.productionTip = productionTip
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})
