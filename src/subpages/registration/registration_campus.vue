<template>
  <view>
    <!-- <tab-bar></tab-bar> -->
    <view class="container">
      3306
      <view class="box" v-for="item in compuslist" :key="item.id" @click="goto(item.hosCode)">
        <view class="hos_name">{{ item.name }}</view>
        <view class="address">地址：{{ item.address }}</view>
        <view class="button">点击预约</view>
      </view>
    </view>
  </view>
</template>
<script>
import { listCampus } from "@/apis/registration"

// import TabBar from "../../components/tabBar/TabBar.vue"
export default {
  //   components: { TabBar },
  props: {},
  data() {
    return {
      compuslist: [],
    }
  },
  onLoad() {
    this.loadCompusList()
  },
  methods: {
    goto(hosCode) {
      uni.navigateTo({
        url: `/pages/registration/registration_secondary_deprtment?hosCode=${hosCode}`,
      })
    },
    async loadCompusList() {
      const params = {
        hospitalId: "218932024874287104",
        type: 1,
      }
      try {
        const { data } = await listCampus(params)
        this.compuslist = data
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
