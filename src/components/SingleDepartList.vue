<template>
  <view class="content">
    <view class="department_container">
      <view class="abc_floor">
        <ul>
          <li v-for="(item, index) in firstCharList" :key="index" @click="chooseCharCode(item)">
            <a>{{ item }}</a>
          </li>
        </ul>
      </view>
      <scroll-view :scroll-top="scrollTop" id="scroll_view" class="scroll_view" ref="scroll" scroll-y="true">
        <view class="department_list">
          <view class="department">
            <template v-for="(item, index) in depList" :key="index">
              <p class="letter" :ref="item.letter" :id="item.letter">{{ item.letter }}</p>
              <view class="item" v-for="item in item.list" :key="item.departId" @click="chooseOne(item)">
                {{ item.departName }}
              </view>
            </template>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    departList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      depList: [],
      firstCharList: [],
      scrollTop: 0,
    }
  },
  created() {
    this.filterDepList(this.departList)
  },
  methods: {
    // 科室列表排序
    filterDepList(dept) {
      const dep = JSON.parse(JSON.stringify(dept))
      const firstCharList = []
      dep.forEach((item) => {
        if (firstCharList.indexOf(item.firstChar.toUpperCase()) === -1) {
          firstCharList.push(item.firstChar.toUpperCase())
        }
      })
      this.firstCharList = firstCharList.sort()
      // 根据首字母列表 生成新的数组
      const depList = this.firstCharList.map((item) => ({ letter: item, list: [] }))

      // 生成科室列表数组
      dep.forEach((item) => {
        depList.forEach((newItem) => {
          if (item.firstChar.toUpperCase() === newItem.letter.toUpperCase()) {
            newItem.list.push(item)
          }
        })
      })
      this.depList = depList
    },
    chooseOne(dep) {
      uni.navigateTo({
        url: `/pages/registration/registration_doctor_list?depCode=${dep.depId}&hosCode=${dep.hosCode}`,
      })
    },
    chooseCharCode(char) {
      this.scrollTop = 0
      setTimeout(() => {
        uni
          .createSelectorQuery()
          .select(`#${char}`)
          .boundingClientRect((data) => {
            //目标节点
            uni
              .createSelectorQuery()
              .select(".scroll_view")
              .boundingClientRect((res) => {
                //最外层盒子节点
                // this.scrollTop = 20
                this.scrollTop = data.top - res.top
              })
              .exec()
          })
          .exec()
      }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.department_container {
  height: 100%;
  overflow: hidden;
  //   background-color: #fff;
  .abc_floor {
    position: fixed;
    z-index: 600;
    right: 0;
    top: 25%;
    width: 8%;
    text-align: center;
    li {
      font-size: 28rpx;
      line-height: 48rpx;
      a {
        color: $uni-color-brand;
      }
    }
  }

  .scroll_view {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    overflow: scroll;
  }

  .department_list {
    background-color: #fff;
    .department {
      .letter {
        box-sizing: border-box;
        border-top: 10rpx solid $uni-border-color;
        border-bottom: 10rpx solid $uni-border-color;
        height: 90rpx;
        padding-left: 50rpx;
        line-height: 70rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: $uni-color-scheme2;
      }
      .item {
        height: 90rpx;
        border-bottom: 4rpx solid $uni-border-color;
        line-height: 90rpx;
        font-size: 32rpx;
        color: $uni-text-color-grey;
        padding-left: 50rpx;
      }
    }
  }
}
</style>
