/**
 * Created by caofanghui on 20/7/21.
 */

 // 第三方插件(绘制 2d canvas库；官网：http://fabricjs.com/)
import { fabric } from "fabric";




/* canvas添加base64图片或网图(宽高自定义)（可以网图，也可以是base64的图）；注意***：图片的跨域问题，必须同域图片。才可使用canvas.toDataUrl()等api
  let options = {
    base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMF........',
    // base64: 'https://oemu.***.net/files/default/2020/05-22/09502519b2db796526.jpg?version=4.1.84&format=240x240.jpeg',
    width: 80,
    height: 80,
    top: 670,
    left: 0,
    selectable: false, // 禁止circle被选中
  }
  makeImageBase64(options).then((cBase64) => {
    console.log(cBase64)
    canvas.add(cBase64)

  })

*/
function makeImageBase64 (options) {
  return new Promise((resolve, reject) => {
    fabric.util.loadImage(options.base64, (nodeImg) => {
      document.querySelector('body').appendChild(nodeImg);

      // 获取图片真实宽高
      let imgInfo = nodeImg.getBoundingClientRect()

      let width = imgInfo.width
      let height = imgInfo.height

      var imgInstance = new fabric.Image(nodeImg, {
        left: options.left,
        top: options.top,
        width: width,
        height: height,
        scaleX: options.width / width,
        scaleY: options.height / height,
        selectable: options.selectable || false, // 禁止circle被选中
      });

      // 清楚创建的dom元素
      document.querySelector('body').removeChild(nodeImg);

      resolve(imgInstance)

    })

  })
}

/* canvas添加网络图片(宽高自定义)(只能是网图)；注意***：图片的跨域问题，必须同域图片。才可使用canvas.toDataUrl()等api
  let options = {
    imgUrl: 'https://oemu.***.net/files/default/2020/05-22/09502519b2db796526.jpg?version=4.1.84&format=240x240.jpeg',
    width: 171,
    height: 171,
    top: 0,
    left: 0,
    selectable: false, // 禁止circle被选中
  }
  // 返回fabric的图片对象实例
  makeImage(options).then((oImg) => {
    console.log(oImg)

    canvas.add(oImg)
  })
*/
function makeImage (options) {
  return new Promise((resolve, reject) => {

    let widthTarget = options.width || 0
    let heightTarget = options.height || 0

    fabric.Image.fromURL(options.imgUrl, (oImg) => {

      // 创建一个dom元素，目的获取图片的宽高
      let imgInfo = creatImg(options.imgUrl)
      let width = imgInfo.width
      let height = imgInfo.height

      // 图片的真实宽高
      options.width = width
      options.height = height

      // 根据实际图片比例进行缩放
      let scaleX = widthTarget / width
      let scaleY = heightTarget / height
      options.scaleX = scaleX
      options.scaleY = scaleY

      // 清除图片url
      delete options.imgUrl

      // 图片
      oImg.set(options)

      resolve(oImg)
    })

  })
}


/* canvas添加圆形图片（可以网图，也可以是base64的图）；注意***：图片的跨域问题，必须同域图片。才可使用canvas.toDataUrl()等api
  let options = {
    // imgUrl: 'https://oemu.***.net/files/default/2020/05-22/09502519b2db796526.jpg?version=4.1.84&format=240x240.jpeg',
    imgUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMF........',
    imgRadio: 100,
    left: 0,
    top: 0,
    selectable: false, // 禁止circle被选中
  }
  // 返回fabric的图片对象实例
  makeCircleImage(options).then((circle) => {
    console.log(circle)

    canvas.add(circle)
  })
*/
function makeCircleImage (options) {
  return new Promise((resolve, reject) => {

    let imgUrl = options.imgUrl || '' // 图片的链接
    let imgRadio = options.imgRadio || 100 // 圆形图的直径
    let left = options.left || 0 // 距左边的距离
    let top = options.top || 0 // 距上边的距离
    let selectable = options.selectable || false // 是否支持选中

    fabric.util.loadImage(imgUrl, (imgT) => {

      // 创建一个dom元素，目的获取图片的宽高
      let imgInfo = creatImg(imgUrl)
      let width = imgInfo.width

      // 放大倍数
      let scale = imgRadio / width
      options.strokeWidth = options.strokeWidth ? options.strokeWidth / scale : 0 // 重置边框宽度，反向缩放

      // 创建头像circle元素
      let circle = new fabric.Circle({
        radius: width / 2, // 图片半径
        left: left,  // 图片位置
        top: top, // 图片位置
        selectable: selectable, // 禁止circle被选中
        ...options, // 传入options覆盖
      });

      // 加入图片作为背景
      circle.fill = new fabric.Pattern({
          source: imgT,
          repeat: 'repeat',
          offsetX: 0,
          offsetY: 0,
      });

      // 调整circle大小
      circle.scale(scale)
      // circle.scaleToWidth(imgRadio)

      resolve(circle)

    })

  })
}
// 创建一个img元素，并返回img信息
function creatImg (imgUrl) {
  // 创建一个dom元素，目的获取图片的宽高
  let nodeImg = document.createElement('img')
  nodeImg.src = imgUrl
  nodeImg.style = 'opacity: 0; position: fixed; top: 0; left: 0; z-index: -10'
  document.querySelector('body').appendChild(nodeImg);

  // 获取图片真实宽高
  let imgInfo = nodeImg.getBoundingClientRect()

  // 清楚创建的dom元素
  document.querySelector('body').removeChild(nodeImg);

  return imgInfo

}

/* canvas添加文案
  let options = {
    text: 'this is\na multiline\ntext\naligned right!',
    textAlign: 'left',
    // lineHeight: 1,
    fontSize: 40,
    fontWeight: 400,
    fill: '#ffffff',
    left: 0,
    top: 330,
    selectable: false, // 禁止circle被选中
  }
  let cText = makeText(options)
  canvas.add(cText)
  
*/
function makeText (options) {
  var text = options.text || ''

  // 清除图片url
  delete options.text

  var textTarget = new fabric.Text(text, options);

  return textTarget
}


/* canvas添加矩形
  let options = {
    left: 0,
    top: 580,
    width: 50,
    height: 50,
    selectable: false, // 禁止circle被选中

    fill: '#D81B60',
    strokeWidth: 2,
    stroke: "#880E4F",

    // rx: 10, // 圆角
    // ry: 10,  // 圆角
    // angle: 45, // 旋转
    // scaleX: 3, // x轴缩放
    // scaleY: 3, // y轴缩放
    // opacity: 1, // 透明度
    // hasControls: true // 放大，旋转可控开关
  }
  let cRect = makeRect(options)
  canvas.add(cRect)

*/
function makeRect (options) {
  var rect = new fabric.Rect(options);

  return rect
}


/* canvas添加直线
  let options = {
    points: [ 0, 650, 100, 650 ],
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    selectable: false,
    evented: false,
  }
  let cLine = makeLine(options)
  canvas.add(cLine)

*/
function makeLine (options) {
  let points = options.points || []

  delete options.points

  let line = new fabric.Line(points, options)

  return line

}


/* 获取canvas的base64

  // 注：这里canvas刚刚绘制完成就生成base64有可能会存在绘制不完全情况，故这种情况下最好加一个外层的延时
  setTimeout(() => {
    let canvasBase64 = getBase64(canvas)
    console.log(canvasBase64)
  }, 300)

*/
function getBase64 (canvas) {
  let base64 = canvas.toDataURL()
  return base64
}

export {
  makeImageBase64,
  makeImage,
  makeCircleImage,
  makeText,
  makeRect,
  makeLine,
  getBase64,
}

/* 常用的方法参考

  // canvas元素分组
  var circle = new fabric.Circle({radius: 100,fill: '#eef',scaleY: 0.5,originX: 'center',originY: 'center'});
  var text = new fabric.Text('hello world', { fontSize: 30, originX: 'center', originY: 'center' });
  var group = new fabric.Group([ circle, text ], {
    left: 150,
    top: 100,
    angle: -10
  });
  canvas.add(group);

*/
