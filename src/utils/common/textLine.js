/**
 * Created by caofanghui on 2020/5/14.
 */


/*
  判断一段文本的真实行数（内容自动填充）
  示例：
  let ele = document.querySelector('.main-title .content')
  let cssStyle = {
    fontSize: '16px'
  }
  let textOver = isTextOver(ele, cssStyle, true) // 如果ele中文字内容超过2行，返回true，少于两行，返回false

  console.log(textOver) // output: 2   (文本真实行数是2)

 */
 // ele：js原生dom对象； rowCount：文字不得超过几行；cssStyle：要保证样式和原有dom一样，特别是字号；removeChild：删除可控的dom
function textLen (ele, cssStyles, removeChild = true) {
  if (!ele) {
    return false;
  }

  const clonedNode = ele.cloneNode(true);
  // 给clone的dom增加样式
  clonedNode.style.overflow = 'visible';
  clonedNode.style.display = 'inline-block';
  clonedNode.style.width = 'auto';
  clonedNode.style.whiteSpace = 'nowrap';
  clonedNode.style.visibility = 'hidden';
  // 将传入的css字体样式赋值
  if (cssStyles) {
    Object.keys(cssStyles).forEach((item) => {
      clonedNode.style[item] = cssStyles[item];
    });
  }

  // 给clone的dom增加id属性
  const containerID = 'collision_node_id';
  clonedNode.setAttribute('id', containerID);

  let tmpNode = document.getElementById(containerID);
  let newNode = clonedNode;
  if (tmpNode) {
    document.body.replaceChild(clonedNode, tmpNode);
  } else {
    newNode = document.body.appendChild(clonedNode);
  }
  // 新增的dom宽度与原dom的宽度*限制行数做对比
  const lineLen = Math.ceil(newNode.offsetWidth / ele.offsetWidth);
  // console.log(newNode.offsetWidth)
  // console.log(ele.offsetWidth)

  if (removeChild) {
    document.body.removeChild(newNode);
  }
  return lineLen;
};


/*
  返回一个文本的真实高度（内容自动填充）
  示例：
  let ele = document.querySelector('.main-title .content')
  let cssStyle = {
    fontSize: '16px',
    width: ele.offsetWidth,
  }
  let textH = textHeight(ele, cssStyle, true)

  console.log(textH) // output: 48   (文本真实高度是48px)

 */
function textHeight (ele, cssStyles, removeChild = true) {
  if (!ele) {
    return false;
  }


  return new Promise((resolve, reject) => {

    const clonedNode = ele.cloneNode(true);
    // 给clone的dom增加样式
    clonedNode.style.overflow = 'visible';
    clonedNode.style.display = 'block';
    // clonedNode.style.width = ele.offsetWidth;

    console.log(ele.offsetWidth)

    clonedNode.style.height = 'auto';
    // clonedNode.style.whiteSpace = 'nowrap';
    clonedNode.style.visibility = 'hidden';
    // 将传入的css字体样式赋值
    if (cssStyles) {
      Object.keys(cssStyles).forEach((item) => {
        clonedNode.style[item] = cssStyles[item];
      });
    }

    // 给clone的dom增加id属性
    const containerID = 'collision_node_id';
    clonedNode.setAttribute('id', containerID);

    let tmpNode = document.getElementById(containerID);
    let newNode = clonedNode;
    if (tmpNode) {
      document.body.replaceChild(clonedNode, tmpNode);
    } else {
      newNode = document.body.appendChild(clonedNode);
    }

    // 如果有图片，先加载图片，之后计算内容高度
    let innerHtml = newNode.innerHTML
    let imgSrcArr = getImgUrls(innerHtml) // 正则匹配出图片urls

    if (imgSrcArr && imgSrcArr.length) {
      imgSrcArr = imgSrcArr.map((item) => {
        return loadImage(item)
      })
  
      Promise.all(imgSrcArr).then((data) => {
        let nodeHeight = newNode.offsetHeight
        resolve(nodeHeight)
      })
    } else {

      // console.log(newNode.offsetHeight)
      // console.log(newNode.offsetWidth)

      let nodeHeight = newNode.offsetHeight
      resolve(nodeHeight)
    }

  })

}

// 从富文本中匹配出图片url
function getImgUrls (html) {
  let reg = /(<img src=").*?(")/g
  let imgSrc = html.match(reg)
  if (imgSrc) {
    // 清除src多余部分（safari不支持正反向预肯定正则方式）
    imgSrc = imgSrc.map((item) => {
      return item.replace(/<img src=/g, '').replace(/"/g, '')
    })
  }

  return imgSrc
}

function loadImage (url) {
  return new Promise((resolve, reject) => {

    const img = new Image();
    img.src = url;
    if (img.complete) {
      resolve()
      return
    }
    img.onload = () => {
      resolve()
    }
    img.onerror = () => {
      resolve()
    }

  })
  
}

export {
  textLen,
  textHeight,
  getImgUrls,
  loadImage,
}
