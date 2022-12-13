import { wxAuth } from "@/apis/login"
import { useUserInfoStore } from "@/store/modules/user"

const mpLogin = () => {
  let platform
  // #ifdef MP-WEIXIN
  platform = "weixin"
  // #endif
  // #ifdef MP-ALIPAY
  // eslint-disable-next-line no-unused-vars
  platform = "alipay"
  // #endif

  uni.login({
    provider: platform,
    success: async (res) => {
      console.log("res", res)
      if (res.errMsg === "login:ok") {
        const { accessToken } = await wxAuth({ code: res.code })
        const userStore = useUserInfoStore()
        userStore.setAuthToken(accessToken)
      }
    },
  })
}

export { mpLogin }
