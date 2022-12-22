<template>
  <view>
    <view class="container">
      <view class="box" @click="goReg('reg')">
        <view class="hos_name">预约挂号</view>
      </view>
      <view class="box" @click="goReg('today')">
        <view class="hos_name">今日挂号</view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { reactive } from "vue"
import { listDepart } from "@/apis/registration"

const state = reactive({ hospitalId: "", hospitalBranchId: "" })

const loadDepartList = async (hospitalId, hospitalBranchId) => {
  const requestData = {
    hospitalId,
    hospitalBranchId,
    departType: 1,
  }
  try {
    const res = await listDepart(requestData)
    console.log(res)
  } catch (error) {
    uni.showToast({
      title: error.data.message,
      icon: "none",
    })
  }
}

onLoad((op) => {
  state.hospitalId = op.hospitalId
  state.hospitalBranchId = op.hospitalBranchId
  loadDepartList(state.hospitalId, state.hospitalBranchId)
})

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
