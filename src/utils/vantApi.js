
import { errMsg } from '@/config/base.config'

/* loading还在中弹窗
  loading(true, '加载中', 2000) // 参数都是可选
*/
function loading (control = true, message = '', duration = 0) {
  if (!control) {
    clearToast()
    return false
  }

  return new Promise((resolve, reject) => {
    window.vant.Toast.loading({
      message: message,
      forbidClick: true,
      duration: duration,
    });

    setTimeout(() => {
      resolve()
    }, duration)
  })

}

/* toast提示
  toast('请求成功', 2000) // 参数都是可选
*/
function toast (message = '请求成功', duration = 1500) {
  return new Promise((resolve, reject) => {
     window.vant.Toast({
      message: message,
      forbidClick: true,
      duration: duration,
    });

    setTimeout(() => {
      resolve()
    }, duration)
  })
}

/* 清除所有toast
  clearToast()
*/
function clearToast () {
  window.vant.Toast.clear()
}

/* 图片预览
  let urls = [
    'https://....../img1.png',
    'https://....../img2.png',
    'https://....../img3.png',
    'https://....../img4.png',
  ]
  showImgs(urls, 3)
*/
function showImgs (urls, index) {
  window.vant.ImagePreview({
    images: urls,
    startPosition: index,
    closeable: true,
  });
}

// 失败弹窗
function failDialog (err) {
  let errorMsg = ''

  if (typeof err === 'string') {
    errorMsg = err
  } else if (err.message) {
    errorMsg = err.message
  } else if (err.msg) {
    errorMsg = err.msg
  } else {
    errorMsg = errMsg
  }

  toast(errorMsg)
}


export {
  loading,
  toast,
  clearToast,
  failDialog,
  showImgs,
};
