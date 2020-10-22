
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }  //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  }  //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1){
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  }  //判断是否Safari浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }  //判断是否IE浏览器
  if (userAgent.toLowerCase().indexOf('ipad') > -1){
    return 'ipad';    
  }
}

/* 判断iphone和安卓
  let phoneType = getPhoneType()
  console.log(phoneType) // 当前机型：iphone、android、other
*/
function getPhoneType () {
  var userAgent = navigator.userAgent.toLowerCase();

  var pattern_phone = new RegExp("iphone","i");
  var pattern_android = new RegExp("Android","i");
  
  var isAndroid = pattern_android.test(userAgent);
  var isIphone = pattern_phone.test(userAgent);

  let type = ''
  if (isIphone) {
    type = 'iphone'
  } else if (isAndroid) {
    type = 'android'
  } else {
    type = 'other'
  }

  return type
}

/* 是否是移动设备
  let isMobile = isMobile()
  console.log(isMobile)

*/
function isMobile(){
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	) return true;
	return false;
}

export {
  myBrowser,
  getPhoneType,
  isMobile,
}
