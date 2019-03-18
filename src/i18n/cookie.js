export default function getCookie(name, defaultValue) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return defaultValue;
}

function setCookie(objName, objValue, objHours) { //添加cookie
  var str = objName + "=" + escape(objValue);
  if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
    var date = new Date();
    var ms = objHours * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
  // alert("添加cookie成功");
}

function delCookie(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=a; expires=" + date.toGMTString();
}

export {
  getCookie,
  setCookie,
  delCookie
}
