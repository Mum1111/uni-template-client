<template>
  <view>
    <view class="container">
      <view class="box" v-for="item in compuslist" :key="item.id" @click="goto(item.id)">
        <view class="hos_name">{{ item.name }}</view>
        <view class="address" v-if="item.address">地址：{{ item.address }}</view>
        <view class="button">点击预约</view>
      </view>
    </view>
  </view>
</template>
<script>
import { listCampus } from "@/apis/registration"
import { config } from "@/config/hospitalConfig"

export default {
  data() {
    return {
      compuslist: [],
    }
  },
  onLoad(op) {
    const { type } = op
    this.loadCompusList(type)
  },
  methods: {
    goto(hosCode) {
      uni.navigateTo({
        url: `/pages/registration/registration_secondary_deprtment?hosCode=${hosCode}`,
      })
    },
    async loadCompusList(type) {
      const params = {
        hospitalId: config.hospitalId,
        type,
      }
      try {
        const res = await listCampus(params)
        this.compuslist = res
      } catch (error) {
        uni.showToast(error.data.message)
      }
    },
  },
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
