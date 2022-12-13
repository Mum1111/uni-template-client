<template>
  <view class="content">
    <view class="text-area">
      <text class="title">123</text>
      <!-- <button @click="handleClick">点击</button> -->
    </view>
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
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
