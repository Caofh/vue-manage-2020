/* eslint-disable */

const protocol = window.location.protocol // 当前协议
const host = protocol + '//' + window.location.host // 当前host

// 开发环境地址(npm run serve)
const devHost = {
  // 本机器使用；接口地址域名相关
  baseApi: protocol + '//123.net',
  imgHost: protocol + '//123.net', // 图片地址host
  videoHost: '/adminfront', // 视频资源地址host
  host: protocol + '//123.net', // 当前页面的域名
  pluginsHost: '/adminfront', // 第三方资源地址

}

// 测试环境地址(npm run test)
const testHost = {

  // 基本
  baseApi: host,
  imgHost: host, // 图片地址host
  videoHost: host, // 视频资源地址host
  host: host, // 当前页面的域名
  pluginsHost: `${host}/adminfront`, // 第三方资源地址

}

// 预发布环境地址(npm run pre)
const preHost = {
  baseApi: host,
  imgHost: host, // 图片地址host
  videoHost: host, // 视频资源地址host
  host: host, // 当前页面的域名
  pluginsHost: `${host}/adminfront`, // 第三方资源地址

}

// 线上环境地址(npm run build)
const proHost = {
  baseApi: host,
  imgHost: host, // 图片地址host
  videoHost: host, // 视频资源地址host
  host: host, // 当前页面的域名
  pluginsHost: `${host}/adminfront`, // 第三方资源地址

}

// 区分环境选择静态资源地址
const env = process.env.VUE_APP_ENV
console.log('当前构建环境：', env)

let exportConfig = ''
if (env === 'production') {
  exportConfig = proHost
} else if (env === 'pre') {
  exportConfig = preHost
} else if (env === 'test') {
  exportConfig = testHost
} else {
  exportConfig = devHost
}


export default exportConfig


