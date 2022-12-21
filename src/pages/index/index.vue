<template>
  <view class="content">
    <button @click="chooseOne()">预约挂号</button>
    <button>就诊人</button>
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
import { mpLogin } from "@/utils/mpLogin"
// #endif

export default {
  data() {
    return {}
  },
  setup() {},
  onLoad() {
    // #ifdef MP-WEIXIN
    mpLogin()
    // #endif
  },
  methods: {
    chooseOne() {
      console.log(1)
      uni.navigateTo({ url: "/subpages/registration/registration_campus" })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $uni-color-error;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
