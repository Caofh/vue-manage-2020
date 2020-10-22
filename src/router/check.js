

import gateWay from '@/config/gateway.config.js'
import router from '.'

// 所有页面的路由守卫，在页面载入前的校验
function check (to) {
  let checkhMark = true
  console.log('check扩展方法')

  let name = to.name

  // 问答管理跳空间站
  // if (name === 'qaIndex') {
  //   let targetUrl = gateWay.host + '/admin/community/answer/list'
    
  //   // window.location.href = targetUrl
  //   window.open(targetUrl)

  //   checkhMark = false
  // }

  // let href = window.location.href
  // let reg = /html/g
  // if (!reg.test(href)) {
  //   patchMark = false
  //
  //   throw new Error('url链接必须以html结尾，目的为自动获取埋点的唯一识别标识：o.paid')
  // }

  return checkhMark
}


export {
  check
}
