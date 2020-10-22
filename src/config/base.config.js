/*
  基础信息配置文件
 */

import gateWay from './gateway.config'

// 全局错误提示
const errMsg = '网络错误，请稍后重试~'

// 巨量空间站lite版的appid
const APPID = 'cli_9ee219d65238500d'

// 需要的第三方插件url集合(js)
const sourceJs = {
  eruda: {
    name: 'eruda', //页面调试工具；文档：https://github.com/liriliri/eruda
    global: 'eruda',
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    src: `${gateWay.pluginsHost}/plugins/eruda/1.0.0/eruda.min.js`
  },
  zepto: {
    name: 'zepto', // zepto；文档：https://github.com/madrobby/zepto
    global: 'Zepto', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js'
    src: `${gateWay.pluginsHost}/plugins/zepto/1.2.0/zepto.min.js`
  },
  moment: { // 文档：http://momentjs.cn/
    name: 'moment',
    global: 'moment', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
    src: `${gateWay.pluginsHost}/plugins/moment/2.24.0/moment.min.js`
  },
  vant: { // 文档：https://youzan.github.io/vant/#/zh-CN/quickstart
    name: 'vant',
    global: 'vant', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdn.jsdelivr.net/npm/vant@2.6/lib/vant.min.js',
    src: `${gateWay.pluginsHost}/plugins/vant/2.6/vant.min.js`
  },
  echarts: { // 文档：https://www.echartsjs.com/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts
    name: 'echarts',
    global: 'echarts', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: 'https://cdn.bootcss.com/echarts/4.7.0/echarts-en.common.min.js'
    src: `${gateWay.pluginsHost}/plugins/echarts/4.7.0/echarts.min.js`
  },
  quill: { // 文档(富文本编辑器插件H5优势明显)：https://quilljs.com/docs/api/#deletetext
    name: 'quill',
    global: 'Quill', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: `https://cdn.quilljs.com/1.3.6/quill.js`
    src: `${gateWay.pluginsHost}/plugins/quill/1.3.6/quill.min.js`
  },
  videoJs: { // 文档(视频播放器插件)：https://videojs.com/getting-started/#videojs-cdn
    name: 'videoJs',
    global: 'videojs', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: `https://cdn.quilljs.com/1.3.6/quill.js`
    src: `${gateWay.pluginsHost}/plugins/video/video.min.js`
  },
  videoHlsJs: { // 文档(视频播放器流媒体插件HLS)：https://videojs.com/plugins(video.js插件集合)
    name: 'videoHlsJs',
    // global: '', // 第三方插件的全局变量名，用于避免重复加载
    selfAddGlobal: 'self_videoHlsJs', // 个人添加全局变量名，避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    // src: `https://cdn.quilljs.com/1.3.6/quill.js`
    src: `${gateWay.pluginsHost}/plugins/video/videojs-contrib-hls.min.js`
  },
  feishusdk: { // 飞书sdk
    name: 'feishu',
    global: 'h5sdk', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    src: 'https://s0.pstatp.com/ee/lark/js_sdk/h5-js-sdk-1.4.5.js'
  },
  
}



export {
  errMsg,
  APPID,
  sourceJs,
}
