<script>
// #ifdef H5
import { h5Login } from "@/utils/html5Utils"
// #endif

export default {
  onLaunch: function () {
    // #ifdef H5
    h5Login()
    // #endif
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
