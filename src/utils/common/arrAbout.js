/*
  数组相关方法
*/


/* 将一个数组以某种形式分割，并按照制定数量重组.
  示例一：
  let count = 2
  let arr = [
      '1234561',
      '1234562',
      '1234563',
      '1234564',
  ]
  let result = getData(arr, count, '-')
  // 输出 [
  //   '1234561-1234562',
  //   '1234563-1234564',
  // ]
  
  示例二：
  let count = 2
  let contentOrigin = `遇到这个问题`
  let result = getData(contentOrigin, count)
  // 输出 [
  //   '遇到',
  //   '这个',
  //   '问题',
  // ]

*/
function arrSplit (arr, count, joinStr = '') {
  let indexMark = 0
  let obj = {

  }

  for (let i = 0; i < arr.length; i++) {
    let mark = i % count
    if (mark == 0) {
        indexMark++
        obj[`arr_${indexMark}`] = []
    }

    obj[`arr_${indexMark}`].push(arr[i])

  }

  // 最终数据
  let arrResult = []
  for (let key in obj) {
      let currArr = obj[key]
      let currStr = currArr.join(joinStr)

      // 追加数据
      arrResult.push(currStr)

  }

  return arrResult

}



export {
  arrSplit
}
