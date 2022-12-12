import { createSSRApp } from "vue"
import App from "./App.vue"
import { setupStore } from "@/store"

console.log(import.meta.env)

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  return {
    app,
  }
}
