<template>
  <view>
    <view class="container">
      <view class="box" v-for="item in compuslist" :key="item.id" @click="goto(item)">
        <view class="hos_name">{{ item.name }}</view>
        <view class="address" v-if="item.address">地址：{{ item.address }}</view>
        <view class="button" :class="item.status === 2 ? 'disable' : ''">点击预约</view>
      </view>
    </view>
  </view>
</template>
<script>
import { listCampus } from "@/apis/registration"
import { config } from "@/config/hospitalConfig"
import { CAMPUS_STATUS_ENUM } from "./enum"

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
    goto(item) {
      if (item.status === 2) {
        uni.showToast({
          title: CAMPUS_STATUS_ENUM[2],
          icon: "none",
        })
        return
      }
      uni.navigateTo({
        url: `/subpages/notice/notice_index?hospitalId=${item.hospitalId}&hospitalBranchId=${item.id}`,
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
    box-shadow: 0rpx 6rpx 16rpx 0rpx $uni-color-scheme2;
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
      background-color: $uni-color-scheme1;
    }

    .disable {
      background-color: $uni-bg-color-mask;
    }
  }
}
</style>
