/*
  专门为适配安卓手机准备的文件，所有需要适配安卓机的逻辑都要在此文件中开发，以便后续维护
*/

import { getPhoneType } from '@/utils/common/navigator-type.js'
import { fs_ready, setTitle } from '@/utils/fsSdk.js'

const onlyAndroid = {

  /*
    // 启动兼容安卓文件内的任意方法
    onlyAndroid.go('setPageTitle', '哈哈哈')
  */
  go (name, options) {
    // 当前机型：iphone、android、other
    let phoneType = getPhoneType()
    if (phoneType === 'android') {
      onlyAndroid[name] && onlyAndroid[name](options)
    }

  },

  // 兼容安卓机器设置title
  setPageTitle (titleName) {
    console.log('onlyAndroid')

    // 兼容安卓机器设置title
    fs_ready().then(() => {
      setTitle(titleName)
      setTimeout(() => {
        setTitle(titleName)
      }, 2000)
      
    })

  }

}


export {
  onlyAndroid
} 


