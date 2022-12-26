<template>
  <view class="doc_list_container">
    <view class="no_doc_list" v-if="docList.length === 0">
      <image class="image" src="/static/img/registration/no_doc.png" alt="" />
      <view class="text">
        暂无可预约医生
        <br />
        请选择其他时间进行预约
      </view>
    </view>
    <ul class="doc_list" v-else>
      <li class="doc_list_item" v-for="item in docList" :key="item.schemaId" @click="chooseOne(item)">
        <view class="doc_avatar">
          <image class="doc_avatar_img" v-if="item.docAvatar" :src="item.docAvatar" />
          <image class="doc_avatar_img" v-else src="/static/img/registration/doc_avatar.png" />
        </view>
        <view class="doc_info">
          <view class="doc_detail">
            <view>
              <span class="doc_name">{{ item.doctorName }}</span>
              <span class="doc_level">{{ item.doctorLevel }}</span>
            </view>
            <span class="reservation" :class="item.remainCount > 0 ? '' : 'full'">{{ item.remainCount > 0 ? "可预约" : "已约满" }}</span>
          </view>
          <view class="doc_goodat">擅长：{{ item.introduction ? item.introduction : "暂无" }}</view>
          <view class="tags"></view>
        </view>
      </li>
    </ul>
  </view>
</template>

<script>
export default {
  name: "DocList",
  props: {
    docList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    chooseOne(item) {
      if (item.srcNum && item.srcNum > 0) {
        this.$emit("chooseDoc", item)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.doc_list_container {
  background-color: #fff;
  .no_doc_list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .image {
      box-sizing: border-box;
      width: 220rpx;
      height: 220rpx;
      margin: 265rpx 265rpx 60rpx 265rpx;
    }
    .text {
      text-align: center;
      font-size: 48rpx;
      line-height: 64rpx;
      color: #c3cad9;
      font-weight: bold;
    }
  }
  .doc_list {
    .doc_list_item {
      padding: 26rpx 50rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .doc_avatar {
        width: 120rpx;
        height: 120rpx;
        margin-right: 40rpx;
        border-radius: 50%;
        overflow: hidden;
        .doc_avatar_img {
          width: 120rpx;
          height: 120rpx;
        }
      }

      .doc_info {
        flex: 1;
        .doc_detail {
          padding-bottom: 25rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .doc_name {
            font-size: 32rpx;
            font-weight: bold;
            color: #45474d;
            margin-right: 20rpx;
          }
          .doc_level {
            font-size: 28rpx;
            color: #45474d;
          }
          .reservation {
            text-align: center;
            line-height: 40rpx;
            width: 120rpx;
            height: 40rpx;
            border: 2rpx solid #3071f2;
            border-radius: 20rpx;
            font-size: 26rpx;
            font-weight: 500;
            color: #3071f2;
          }
          .full {
            color: #c3cad9;
            border: 2rpx solid #c3cad9;
          }
        }
        .doc_goodat {
          font-size: 24rpx;
          color: #8a8f99;
          line-height: 36rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          // white-space: nowrap; //溢出不换行
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}
</style>
