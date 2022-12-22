<template>
  <view class="notice_container">
    <view class="content">
      <view class="notice_title">预约须知</view>
      <view class="notice_content">
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
        我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了
      </view>
    </view>
    <view class="button_group" @click="next">我知道了</view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { reactive } from "vue"

const state = reactive({ hospitalId: "", hospitalBranchId: "" })

onLoad((op) => {
  state.hospitalId = op.hospitalId
  state.hospitalBranchId = op.hospitalBranchId
})

const next = () => {
  uni.navigateTo({
    url: `/subpages/registration/registration_depart_list?hospitalId=${state.hospitalId}&hospitalBranchId=${state.hospitalBranchId}`,
  })
}
</script>

<style lang="scss" scoped>
.notice_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  .content {
    overflow: auto;
    height: calc(100vh - 180rpx);
  }
  .button_group {
    height: 180rpx;
    width: 100vw;
    background-color: $uni-color-scheme1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
