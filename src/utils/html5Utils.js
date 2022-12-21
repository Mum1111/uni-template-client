import { h5Auth, h5LoginState } from "@/apis/login"
import { useUserInfoStore } from "@/store/modules/user"

/**
 * 获取url中的参数
 */
export const getUrlData = () => {
  let strs
  let url = window.location.href //获取url中"?"符后的字串
  const theRequest = {}
  if (url.indexOf("?") !== -1) {
    url = url.substr(url.indexOf("?"))
    const str = url.substr(1)
    strs = str.split("&")
    for (let i = 0; i < strs.length; i++) {
      const index = strs[i].indexOf("=")
      theRequest[strs[i].slice(0, index)] = unescape(strs[i].slice(index + 1, strs[i].length))
    }
  }

  return theRequest
}

const delUrlParam = (url, field) => {
  let str = ""
  if (url.indexOf("?") !== -1) {
    str = url.substr(url.indexOf("?") + 1)
  } else {
    return url
  }
  let arr = ""
  let returnurl = ""
  if (str.indexOf("&") !== -1) {
    arr = str.split("&")
    // eslint-disable-next-line no-restricted-syntax
    for (const i in arr) {
      if (arr[i].split("=")[0] !== field) {
        returnurl = returnurl + arr[i].split("=")[0] + "=" + arr[i].split("=")[1] + "&"
      }
    }
    return url.substr(0, url.indexOf("?")) + "?" + returnurl.substr(0, returnurl.length - 1)
  }
  arr = str.split("=")
  if (arr[0] === field) {
    return url.substr(0, url.indexOf("?"))
  }
  return url
}

/**
 * 判断浏览器
 */
const getBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  // eslint-disable-next-line eqeqeq
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return "微信"
  }
  return "其他"
}

/**
 * 公众号获取code
 */
const getLoginCode = (state) => {
  const appId = import.meta.env.VITE_H5_APPID
  const nowUrl = encodeURIComponent(window.location.href)
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${nowUrl}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`

  window.location.replace(url)
}

const h5Login = async () => {
  const getRequest = getUrlData()
  if (getBrowser() === "微信") {
    if (getRequest.code) {
      const httpData = {
        code: getRequest.code,
        state: getRequest.state,
      }
      const { accessToken } = await h5Auth(httpData)
      const userStore = useUserInfoStore()
      userStore.setAuthToken(accessToken)
      const url = delUrlParam(window.location.href, "code")
      window.location.href = url
    } else {
      const isLogin = window.sessionStorage.getItem("isLogin")
      if (isLogin) return
      const res = await h5LoginState()
      getLoginCode(res.state)
      window.sessionStorage.setItem("isLogin", true)
    }
  } else {
    // TODO: 不是小程序的h5登陆
  }
}

export { getBrowser, h5Login }
