<script>
const a = [1, 2, 3]

const ele = a.find((item) => item === 2)
console.log("ele", ele)
export default {
  onLaunch: function () {
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
