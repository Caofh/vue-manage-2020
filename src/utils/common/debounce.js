

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

export {
  debounce,
  throttle,
}
