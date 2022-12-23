import { defineStore } from "pinia"
import { getItem, removeItem, setItem } from "@/utils/storage"
// import { h5Login } from "@/utils/html5Utils"

export const useUserInfoStore = defineStore({
  id: "user-info-store",
  state: () => ({
    authToken: "",
  }),

  getters: {},
  actions: {
    setAuthToken(token) {
      setItem("authToken", token)
      this.authToken = token
    },
    getAuthToken() {
      if (!this.authToken) {
        if (!getItem("authToken")) {
          // 重新登录
          // h5Login()
          return ""
        }
        const token = getItem("authToken")
        this.setAuthToken(token)
        return token
      }
      return this.authToken
    },
    removeAuthToken() {
      removeItem("authToken")
      this.authToken = ""
    },
  },
})
