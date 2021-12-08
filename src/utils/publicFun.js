function getParams(arr = [], obj = {}) {
  let parStr = window.location.search.substring(1)
  if (parStr.indexOf("&") !== -1) {
    // 说明还有其他参数
    arr = parStr.split("&")
    arr.forEach((item) => {
      obj[item.split("=")[0]] = item.split("=")[1]
    })
    return obj
  }
  obj[parStr.split("=")[0]] = parStr.split("=")[1]
  return obj
}
function mobileType() {
  var u = navigator.userAgent
  var android = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //android终端或者uc浏览器
  var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  var iphoneX = false
  if (ios) {
    // eslint-disable-next-line no-restricted-globals
    if (screen.height == 812 || screen.height === 896) {
      //是iphoneX
      iphoneX = true
    } else {
      //不是iphoneX
    }
  }
  return {
    android,
    ios,
    iphoneX,
  }
}
