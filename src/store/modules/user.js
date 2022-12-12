import { defineStore } from "pinia"
import { removeItem, setItem } from "@/utils/storage"

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
      setItem("authToken", token)
      this.authToken = token
    },
    removeAuthToken() {
      removeItem("authToken")
      this.authToken = ""
    },
  },
})
