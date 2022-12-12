<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ authToken }}</text>
      <button @click="handleClick">点击</button>
    </view>
  </view>
</template>

<script>
import { computed } from "vue"
import { useUserInfoStore } from "@/store/modules/user"

export default {
  data() {
    return {
      title: "Hello",
      s: 123,
    }
  },
  setup() {
    const store = useUserInfoStore()

    return {
      authToken: computed(() => store.authToken),
      setAuthToken: store.setAuthToken,
    }
  },
  onLoad() {},
  methods: {
    handleClick() {
      this.setAuthToken(this.title)
    },
  },
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
