<template>
  <view>
    <view class="container">
      <view class="box" @click="goReg()">
        <view class="hos_name">预约挂号</view>
      </view>
      <view class="box" @click="goReg()">
        <view class="hos_name">今日挂号</view>
      </view>
    </view>
  </view>
</template>
<script setup>
const goReg = () => {
  console.log(11)
}
</script>
<style scoped lang="scss">
.container {
  box-sizing: border-box;
  padding: 40rpx;
  .box {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 40rpx;
    overflow: hidden;
    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 0rpx 6rpx 16rpx 0rpx #ffe5f2;
    .hos_name {
      padding: 20rpx;
      font-size: 32rpx;
      border-bottom: 2rpx solid #eee;
    }
    .address {
      padding: 20rpx;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 75rpx;
      color: #fff;
      font-size: 32rpx;
      background-color: #d9418d;
    }
  }
}
</style>
