<script>
import { h5Login } from "@/utils/html5Utils"

export default {
  onLaunch: function () {
    h5Login()
    console.log("App Launch")
  },
  onShow: function () {
    console.log("App Show")
  },
  onHide: function () {
    console.log("App Hide")
  },
}
</script>

<style>
/*每个页面公共css */
</style>
