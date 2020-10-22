
import { APPID } from '@/config/base.config'
import gateWay from '@/config/gateway.config'

import { reg_url } from '@/utils/common/reg_rules.js'
import { urlToJson, toQueryString } from '@/utils/common/url_query'
import { goPageBlank } from '@/utils/fsSdk.js'

import cookie from 'component-cookie'

//返回传递给他的任意对象的类(返回：array、object、number、string)
function typeOf(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";

  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

// 坐标像素转换(count:设计图(750)上的px值)，设计图的px => 真实dom中的px
function changePx(count) {
  const winWidth = window.screen.width;
  const ratio = winWidth / 750; // 比例
  return count * ratio;
}

// 防抖中心思想：如果频繁操作，在setTimeout未执行前就clearTimeout，则当前setTimeout就不会执行。
function debounce (method, delay) {
  let timer = null
  return function () {
    let self = this,
        args = arguments

    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(self, args)


    }, delay)

  }

}

// 节流：如果频繁操作，在setTimeout未执行前就clearTimeout，则当前setTimeout就不会执行。
function throttle (method, duration) {
  let timer = null
  let startTime = new Date()

  return function () {
    let endTime = new Date()
    let self = this
    let args = arguments

    clearTimeout(timer)
    if (endTime - startTime >= duration) {
      method.apply(self, args)
      startTime = endTime
    } else {
      timer = setTimeout(function () {
        method.apply(self, args)
      }, duration)
    }
  }

}

// 升级版截流：滑动过快防抖，滑动慢截流
// duration截流的时间间隔（默认400:截流每400ms执行一次）；speed：每秒滑动多少px算是滑动过快，禁止截流逻辑(默认1000:每秒1000px为滑动过快)
function throttle_v1 (method, duration = 400, speed = 1000) {
  let timerDebounce = null
  let timer = null
  let startTime = new Date()

  // 滑动过快距离判断
  let startPosition = 0
  let positionTimer = null
  let distance = speed / 1000 * duration // 将每秒的速度换算成对应设置的duration的距离
  console.log(distance)

  return function () {
    let endTime = new Date()
    let self = this
    let args = arguments

    positionTimer = setTimeout(function () {
      let offsetTop = document.documentElement.scrollTop

      // 滑动过快
      if (Math.abs(offsetTop - startPosition) > distance) {
        console.log('滑动过快，关闭截流')

        startPosition = offsetTop
        startTime = endTime

        timerDebounce && clearTimeout(timerDebounce)
        timerDebounce = setTimeout(function () {
          console.log('滑动过快，执行最后的防抖逻辑')
          method.apply(self, args)
        }, duration)
        
      } else {
        // 滑动慢，开始启动截流
        startPosition = offsetTop

        clearTimeout(timer)
        if (endTime - startTime >= duration) {
          console.log('滑动慢，截流逻辑')

          method.apply(self, args)
          startTime = endTime
        } else {
          timer = setTimeout(function () {
            method.apply(self, args)
          }, duration)
        }

      }

    }, duration)

  }

}

// 设置cookie
function setCookie (key, value, config) {
  if (!/^lite_manage_.*/.test(key)) {
    throw new warn('lite_manage项目设置localStorage的key值最必须以"lite_manage_"开头，请修改!')
    return false
  }

  let defaultConfig = {
    path: '/',
  }
  Object.assign(defaultConfig, config)

  cookie(key, value, defaultConfig)

}

// 获取cookie
function getCookie (key) {
  if (!/^lite_manage_.*/.test(key)) {
    throw new warn('lite_manage项目设置localStorage的key值最必须以"lite_manage_"开头，请修改!')
    return false
  }

  return cookie(key)

}

/* H5设置本地存储(示例如下)
  1. setStorage('business_name', '哈哈哈')
  2. setStorage('business_name', {a:1, b:2})
 */
function setStorage(key, value) {
  if (!/^lite_manage_.*/.test(key)) {
    throw new warn('lite_manage项目设置localStorage的key值必须以"lite_manage_"开头，请修改!')
    return false
  }

  const v = typeOf(value) === 'string' ? value : JSON.stringify(value) || '';
  localStorage.setItem(key, v);
}

/* H5删除本地存储(示例如下)
  removeStorage('20191111_game_v1')
 */
function removeStorage(key) {
  localStorage.getItem(key) && localStorage.removeItem(key);
}

/* H5获取本地存储(示例如下)
  1. let data = getStorage('20191111_game_v1')
  2. let data = getStorage('20191111_game_v1', 'deviceId')
  console.log(data)
 */
function getStorage(key, subKey) {
  let res = '';
  const stringLocal = localStorage.getItem(key) || '';
  let parseLocal = '';

  try {
    parseLocal = JSON.parse(stringLocal);
  } catch (error) {
    parseLocal = stringLocal;
  }

  // 区分是否有subKey
  if (!subKey) {
    res = parseLocal;
  } else {
    if (typeOf(parseLocal) === 'object') {
      res = parseLocal[subKey] || '';
    }
  }

  return res;
}

// 判断是否是pc端
function isPC(){
  let userAgentInfo = navigator.userAgent;
  let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
  }
  return flag;
}

//设置页面rem
function setRem (winWidth, baseVal = 10) {
  const win = window
  const doc = document

  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  const recalc = () => {
    let clientWidth = winWidth || docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = (clientWidth / baseVal) + 'px'
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

// 匹配后台返回图片地址
/*
  let originUrl = 'public://default/2019/12-06/142302685a77299012.jpg'

  let target = suffix(originUrl)
  console.log(target) // http://oemu-dev.***.net/files/default/2019/12-17/113804caf713654885.png
 */
function suffix(path) {

  let imgUrl = path ? gateWay.imgHost + '/files/' + path.substr(9) : ''

  return imgUrl
}

// 匹配后台返回图片地址_v2(默认统一使用这些尺寸：50、120、240、480、720)
/*
  let originUrl = '/files/default/2020/05-20/1105128cfab5265881.jpeg'

  let target = suffix_v2(originUrl)
  console.log(target) // http://oemu-dev.***.net/files/default/2020/05-20/1105128cfab5265881.jpeg
 */
function suffix_v2(path, size = 240) {
  // 区分是不是http的完成图片url
  let isHttp = reg_url.test(path)
  let imgUrl = ''

  if (isHttp) {
    imgUrl = addSuff(path, size)
  } else {
    imgUrl = path ? addSuff(gateWay.imgHost + path, size) : ''
  }

  return imgUrl
}
function addSuff (path, size = 240) {
  let suffSize = `format=${size}x${size}.jpeg`

  return path + ( (path.indexOf('?') > -1) ? `&${suffSize}` : `?${suffSize}` )
}

// 增加页面渐近渐出效果
/* vueObj: 传入vue对象，因为要使用vuex的数据
  fade(this)
*/
function fade (vueObj) {
  vueObj.$store.commit('SETSHOWTRANS', true)

  setTimeout(() => {
    vueObj.$store.commit('SETSHOWTRANS', false)
  }, 400)
}

// 切换页面转场效果，默认为从右向左
function toggleMoveType (vueObj, type = 'moveR') {
  vueObj.$store.commit('SETMOVETYPE', type)

  setTimeout(() => {
    vueObj.$store.commit('SETMOVETYPE', 'router-fade')
  }, 400)
}

// 跳转到飞书新页面，返回保存当前位置
function goPage (targetUrl) {
  console.log('进入打开新页面方法：goPage')

  let urlPara = urlToJson(targetUrl).paramJson // 获取url参数

  // fix飞书缓存html问题，加时间戳刷新.
  if (!urlPara['_T'] || !urlPara['app_id']) {
    urlPara['_T'] = new Date().getTime(); // 时间戳字符串  
    urlPara['app_id'] = APPID

    targetUrl = targetUrl.split('?')[0] + '?' + toQueryString(urlPara) // 兼容飞书浏览器刷新
  }

  // 新启一页，飞书app内打开新webview，浏览器内直接跳转
  if (window.h5sdk) {
    goPageBlank(targetUrl)
  } else {
    // window.open(targetUrl)
    window.location.href = targetUrl
  }
  
}

/* 将一个数组分割成n个数组组成的数组方法
let count = 2
let arr = [
    '1234561',
    '1234562',
    '1234563',
    '1234564',
    '1234565',
    '1234566',
]
let data = getData(arr, count) // 每2个item一组分割大数组
console.log(data)
*/
function getData (arr, count) {
  let indexMark = 0
  let obj = {

  }

  arr.map((item, index) => {
      let mark = index % count
      if (mark == 0) {
          indexMark++
          obj[`arr_${indexMark}`] = []
      }

      obj[`arr_${indexMark}`].push(item)
  })

  // 最终数据
  let arrResult = []
  for (let key in obj) {
      let currArr = obj[key]

      // 追加数据
      arrResult.push(currArr)
  }

  return arrResult
}

/* 禁止整个页面滚动
  stopScroll(true)
*/
function stopScroll (control = true) {
  if (control) {
    $('body').addClass('stopScroll')
  } else {
    $('body').removeClass('stopScroll')
  }
}


// 加载img
function loadImage (url, callback) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      resolve(url)
      return
    }
    img.onload = () => {
      resolve(url)
    }
    img.onerror = () => {
      resolve(url)
    }

  })
  
}

// 比较版本号大小
function versionCompare (arr) {
  let a = arr.sort((a,b)=>{

      let items1 = a.split('.')
      let items2 = b.split('.')

      let k = 0

      for (let i in items1) {

        let a1 = items1[i]
        let b1 = items2[i]
        // console.log(a1)
        // console.log(b1)

        if (typeof a1 === undefined) {

          k = -1

          break

        } else if (typeof b1 === undefined) {

          k = 1

          break

        } else {

          if (a1 === b1) {

            continue

          }

          k = Number(a1) - Number(b1)
          // k = Number(b1) - Number(a1)

          break

        }

      }

      return k

  })

  return a
}

// fix飞书缓存html问题，加时间戳刷新.（独立命名空间）
var cacheRefresh = {
  init () {
    // fix飞书缓存html问题，加时间戳刷新.
    // 没有时间戳，刷新加时间戳；
    var urlPara = urlToJson().paramJson
    console.log(urlPara)

    if (!urlPara['_T'] || !urlPara['app_id']) {
      urlPara = this.urlAddTimestamp(urlPara) // 增加_T时间戳，解决飞书app强缓存问题
      urlPara = this.urlAddAppid(urlPara) // 增加app_id，解决飞书原生分享图片破损问题

      window.location.replace(window.location.href.split('?')[0] + '?' + toQueryString(urlPara)) // 兼容飞书浏览器刷新

    }

  },
  // 增加_T时间戳，解决飞书app强缓存问题
  urlAddTimestamp (urlPara) {
    var str = new Date().getTime(); // 时间戳字符串         
    urlPara['_T'] = str

    return urlPara
  },
  // 增加app_id，解决飞书原生分享图片破损问题
  urlAddAppid (urlPara) {
    urlPara['app_id'] = APPID

    return urlPara
  },


}

// 浏览器返回上一页
function goBack () {
  window.history.back(-1) // 直接返回当前页的上一页，数据全部消息，是个新页面
  // window.history.go(-1) // 也是返回当前页的上一页，不过表单里的数据全部还在
}

/* router跳转下一页，router.push
  let options = {
    name: 'sqDetail',
    query: {
      id: 3
    },
    params: {
      topicId: 6
    }
  }
  pushPage(this, options)
*/
function pushPage (vueObj, options) {
  
  let name = options.name || {}
  let query = options.query || {}
  let params = options.params || {}

  // 统一将每个路由上加时间戳，避免飞书内部缓存html
  // query['_T'] = new Date().getTime()

  vueObj.$router.push({
    name: name,
    query: query,
    params: params
  }).catch((err) => {
    console.log('vue-router捕获catch，不必在意：', err)
  })
}
/* router跳转下一页，router.replace
  let options = {
    name: 'sqDetail',,
    query: {
      id: 3
    },
    params: {
      topicId: 6
    }
  }
  replacePage(this, options, 'moveR') // 转场动画类型（router-fade:渐入渐出；moveR:从右向左；moveUp:从下往上；now:立刻跳转，无任何转场）
*/
function replacePage (vueObj, options, scene = 'fade') {
  
  let name = options.name || {}
  let query = options.query || {}
  let params = options.params || {}

  // 统一将每个路由上加时间戳，避免飞书内部缓存html
  query['_T'] = new Date().getTime()

  if (scene !== 'now') {
    if (scene === 'fade') {
      fade(vueObj)
    } else {
      fade(vueObj)
      toggleMoveType(vueObj, scene)
    }
  }

  vueObj.$router.replace({
    name: name,
    query: query,
    params: params
  }).catch((err) => {
    console.log('vue-router捕获catch，不必在意：', err)
  })
}

// 当前页面history数量
function historyLen () {
  return window.history.length
}

// 设置飞书的navigation的右边按钮
let setFsNavigation = {
  loop: null,
  init (callback) {
    // clearTimeout(this.loop)
    // this.loop = null

    if (window.h5sdk &&
        window.h5sdk.biz &&
        window.h5sdk.biz.navigation && 
        window.h5sdk.biz.navigation.setLeft) {

        setTimeout(() => {
          callback && callback()
        }, 300)
     

    } else {

      setTimeout(() => {
        setFsNavigation.init(callback)
      }, 300)
      
    }

  }

}

/* 时间戳格式化（sub：秒级时间戳差值）
  let value = (new Date().getTime() - 86400) / 1000 // 将ms转为s

  let subTime = timeFormat(value)
  console.log(subTime) // 打印：40秒前 、 30分钟前 、 3小时前 、 3天前 、 3个月前 或 1年前
*/
function timeFormat (value) {
  let now = Math.round(new Date().getTime() / 1000)
  let sub = now - value

  let timeStr = ''
  if (sub <= 60) {
    timeStr = `${sub} 秒前`
  } else if (sub <= 3600) {
    let min = Math.floor(sub / 60)
    timeStr = `${min} 分钟前`
  } else if (sub <= 86400) {
    let hour = Math.floor(sub / 3600)
    timeStr = `${hour} 小时前`
  } else if (sub <= 2592000) {
    let day = Math.floor(sub / 86400)
    timeStr = `${day} 天前`
  } else if (sub <= 31104000) { // 3600 * 24 * 30 * 12 (12个月：31104000秒)
    let month = Math.floor(sub / 2592000)
    timeStr = `${month} 个月前`
  } else {
    let year = Math.floor(sub / 31104000)
    timeStr = `${year} 年前`
  }

  return timeStr
}

// 权限控制
function getAuth () {
  let isSuper = getCookie('lite_manage_isSuper')

  return isSuper
}

export {
  typeOf,
  changePx,
  debounce,
  throttle,
  throttle_v1,
  setStorage,
  getStorage,
  removeStorage,
  isPC,
  setRem,
  suffix,
  suffix_v2,
  fade,
  toggleMoveType,
  goPage,
  getData,
  stopScroll,
  loadImage,
  versionCompare,
  cacheRefresh,
  goBack,
  pushPage,
  replacePage,
  historyLen,
  setFsNavigation,
  timeFormat,
  setCookie,
  getCookie,
  getAuth,
  
};
