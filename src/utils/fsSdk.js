/*
  飞书H5页面内嵌sdk方法；文档：https://open.feishu.cn/document/uYjL24iN/uITO4IjLykDOy4iM5gjM
*/

import { initAsyn_promise } from "@/utils/loadJs";
import { isMobile } from "@/utils/common/navigator-type.js";

// 飞书ready函数
function fs_ready () {
  return new Promise((resolve, reject) => {

    if (window.h5sdk) {
      window.h5sdk.ready(() => {
        resolve()
      })
    } else {
      reject('非飞书环境，飞书相关jssdk无效。请在飞书app内打开并引入飞书jsskd。')
    }

  })
}

/* 设置左侧导航
  let options = {
    control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
    isShowIcon: true, //控制是否显示icon, true为显示，false为隐藏，默认为true
    text: '哈哈哈' //控制显示文本，空字符串表示不显示文本，不传代表显示默认文本
  }
  setLeft(options).then(() => {
    console.log('点击之后执行回掉函数')
  })
*/
function setLeft (options = {}) {

  let control = options.control || false
  let text = options.text || ''
  let isShowIcon = options.isShowIcon || true

  return new Promise((resolve, reject) => {

    fs_ready().then(() => {
      window.h5sdk.biz.navigation.setLeft({
        control: control,  //是否控制点击事件，true 控制，false 不控制， 默认false
        text: text,  //控制显示文本，空字符串表示不显示文本，不传代表显示默认文本
        isShowIcon: isShowIcon,  //控制是否显示icon, true为显示，false为隐藏，默认为true
        onSuccess: () => {
          console.log('点击最上方导航按钮')
          resolve()
        },
        onFail: (err) => {
          console.log(err);
          reject(err)

        }
      })

    });

  })

}

/* 返回上一页
  goBack().then(() => {
    console.log('返回之后执行回掉函数')
  })
*/
function goBack () {
  return new Promise((resolve, reject) => {

    fs_ready().then(() => {
      window.h5sdk.biz.navigation.goBack({
          onSuccess: function(result) {
            resolve(result)
          }
      });

    })

  })

}
/* 手机抖动
  vibrate(1000).then(() => {
    console.log('执行之后回掉函数')
  })
*/
function vibrate (duration = 1000) {
  return new Promise((resolve, reject) => {

    fs_ready().then(() => {
      window.h5sdk.device.notification.vibrate({
          duration: duration,
          onSuccess: function(result) {
            resolve(result)
          }
      });

    })

  })

}

/* 设置右侧导航
  let items = [
      { id: "1", text: '更多' },
  ]
  setMenu(items, (result) => {
    console.log(result)
  })
*/
function setMenu (items, callback) {
  fs_ready().then(() => {
    window.h5sdk.biz.navigation.setMenu({
      items: items,
      onSuccess: function (result) {
        callback && callback(result)
      }
    });

  })
}

/* 设置title
  setTitle('我是title')

*/
function setTitle (title) {
  fs_ready().then(() => {
    window.h5sdk.biz.navigation.setTitle({ title: title })
  })

}

/* 图片预览
  let urls = [
    'https://....../img1.png',
    'https://....../img2.png',
    'https://....../img3.png',
    'https://....../img4.png',
  ]
  previewImage(urls, 3)

*/
function previewImage (urls, index = 0) {
  window.h5sdk.biz.util.previewImage({
      urls: urls,
      current: urls[index]
  });
}

/* 分享
  let url = 'https://www.baidu.com'
  let title = '分享的标题'

  fsShare(url, title, (result) => {
    console.log(result)
  })
*/
function fsShare (url, title, callback) {
  return new Promise((resolve, reject) => {

    fs_ready().then(() => {
      window.h5sdk.biz.util.share({
          url: url, // 分享的链接
          title: title, // 分享的标题
          onSuccess: function(result) {
              // console.log(result);
              callback && callback(result)
          }
      });

    })

  })

}

/* 分享
  let content = '复制内容'

  copyText(content).then(() => {
    console.log('复制成功')
  })
*/
function copyText (content) {
  return new Promise((resolve, reject) => {

    fs_ready().then(() => {
      window.h5sdk.biz.util.copyText({
          text: content
      });

      resolve()

    })

  })

}

/* 新起一个webview，打开新页
  let url = 'https://www.baidu.com'

  goPageBlank(url)

*/
function goPageBlank (url) {
  return new Promise((resolve, reject) => {
    fs_ready().then(() => {
      window.h5sdk.biz.util.openLink({
          url: url,
          title: "",
          newTab: true
      });

      resolve()

    })
  })
}

export {
  fs_ready,
  setLeft,
  setMenu,
  setTitle,
  goBack,
  vibrate,
  previewImage,
  fsShare,
  copyText,
  goPageBlank,
};
