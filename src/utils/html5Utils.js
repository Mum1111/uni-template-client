import { h5LoginState } from "@/apis/login"

/**
 * 判断浏览器
 */
const getBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === "micromessenger") {
    return "微信"
  }
  return "其他"
}

/**
 * 公众号获取code
 */
const getLoginCode = (state) => {
  const appId = import.meta.VITE_H5_APPID
  const nowUrl = encodeURIComponent(window.location.href)
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${nowUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`

  window.location.replace(url)
}

const h5Login = async () => {
  if (getBrowser() !== "微信") {
    const res = await h5LoginState()
    console.log("res1", res)
    // getLoginCode(state)
  } else {
    // TODO: 不是小程序的h5登陆
  }
}

export { getBrowser, h5Login, getLoginCode }
