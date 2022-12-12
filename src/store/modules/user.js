import { defineStore } from "pinia"

export const useUserInfoStore = defineStore({
  id: "user-info-store",
  state: () => ({
    authToken: "",
  }),

  getters: {
    getAuthToken() {
      return this.authToken
    },
  },
  actions: {
    setAuthToken(token) {
      uni.setStorageSync("authToken", token)
      this.authToken = token
    },
  },
})
