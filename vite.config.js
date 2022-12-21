import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import { resolve } from "path"

function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  optimizeDeps: ["@dcloudio/uni-ui"],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
})
