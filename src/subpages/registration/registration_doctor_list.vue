<!-- eslint-disable guard-for-in -->
<template>
  <view>
    <view class="doctor_list_container">
      <view class="calendar">
        <view class="all_doc">
          <view class="all_doc_button" :class="isActive ? 'active' : ''" @click="chooseAllDoc">
            所有
            <br />
            医生
          </view>
        </view>
        <ul class="registration_date">
          <li class="date_item" v-for="(item, index) in dateList" :key="index" @click="chooseDate(item)">
            <view class="container" :class="isActive && nowDate === item.date ? 'active' : ''">
              <view class="week">{{ item.week }}</view>
              <view class="date">{{ item.date.substring(5, 10) }}</view>
              <view class="scr_num">有号</view>
            </view>
          </li>
        </ul>
      </view>
      <doc-list class="doc_list" :docList="showDocList" @chooseDoc="next"></doc-list>
    </view>
  </view>
</template>

<script>
import dayjs from "dayjs"
import { listDepartSchedule } from "@/apis/registration"
import DocList from "@/components/DocList"

export default {
  components: { DocList },
  data() {
    return {
      hospitalId: "",
      hospitalBranchId: "",
      departId: "",
      departCode: "",
      showDocList: [],
      depCode: "",
      hosCode: "",
      nowDate: "",
      allDocList: [],
      docList: [],
      dateList: [],
      isActive: false,
      covid: undefined,
    }
  },
  onShow() {},
  onLoad(option) {
    const { hospitalId, hospitalBranchId, departId, departCode } = option
    this.loadDepSchema(option)
    this.hospitalId = hospitalId
    this.hospitalBranchId = hospitalBranchId
    this.departId = departId
    this.departCode = departCode
  },
  methods: {
    async loadDepSchema(data) {
      const queryString = {
        "hospitalId": data.hospitalId,
        "hospitalBranchId": data.hospitalBranchId,
        "departId": data.departId,
        "departCode": data.departCode,
        "getDepartType": 1,
      }

      const res = await listDepartSchedule(queryString)
      this.docList = res.schedules
      this.showDocList = res.schedules
      this.getShowList(res.schedules)
    },
    chooseDate(item) {
      // 获取item中的每一项
      const filterArray = this.filterDocList(item.date)
      this.showDocList = filterArray
      this.nowDate = item.date
      this.isActive = true
    },
    filterDocList(date) {
      const docList = this.docList.filter((item) => Object.keys(item.schedules).includes(date) && item.schedules[date] > 0)
      return docList
    },
    chooseAllDoc() {
      this.isActive = false
      this.showDocList = this.docList
    },
    getShowList: function (dateList) {
      const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
      const scheduleSet = new Set()
      if (dateList.length > 0) {
        dateList.forEach((item) => {
          Object.keys(item.schedules).forEach((date) => scheduleSet.add(date))
        })
        const scheduleList = [...scheduleSet]
        const dateArr = []
        scheduleList
          .map((item) => new Date(item).getTime())
          .sort((a, b) => a - b)
          .map((item) => dayjs(item).format("YYYY-MM-DD"))
          .forEach((item) => {
            dateArr.push({ week: weeks[new Date(item).getDay()], date: item })
          })

        this.dateList = dateArr
      }
    },
    next(item) {
      // 如果depCode为3244 携带参数到详情页面
      if (["3244", "3268"].indexOf(item.depId) > -1) {
        uni.navigateTo({
          url: `/pages/covid/covid_schema_detail?deptCode=${item.depId}`,
        })
        return
      }
      uni.navigateTo({
        url: `/pages/registration/registration_doctor_detail?deptCode=${item.depId}&docCode=${item.docId}&hosCode=${this.hosCode}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.doctor_list_container {
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  .calendar {
    height: 180rpx;
    display: flex;
    border-bottom: 10rpx solid #e6e9f5;
    border-top: 2rpx solid #e6e9f5;
    .all_doc {
      box-sizing: border-box;
      padding: 10rpx 20rpx;
      border-right: 2rpx solid #e6e9f5;
      background-color: #fff;
      .all_doc_button {
        background-color: #3071f2;
        color: #fff;
        width: 110rpx;
        height: 160rpx;
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 32rpx;
        font-weight: bold;
      }
      .active {
        background-color: #fff;
        color: #3071f2;
      }
    }
    .registration_date {
      flex: 1;
      // background: burlywood;
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      align-items: center;
      white-space: nowrap;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      .date_item {
        box-sizing: border-box;
        display: inline-block;
        padding: 30rpx 15rpx 0 38rpx;
        text-align: center;
        .container {
          width: 110rpx;
          margin-bottom: 30rpx;
          border-radius: 20rpx;
          .week {
            color: #45474d;
            font-size: 28rpx;
            line-height: 36rpx;
          }
          .date {
            color: #45474d;
            font-size: 28rpx;
            line-height: 40rpx;
          }
          .scr_num {
            font-size: 28rpx;
            line-height: 60rpx;
            font-weight: 500;
            color: #3071f2;
          }
          .full {
            color: #c3cad9;
          }
        }
        .active {
          background-color: #3071f2;
          .week {
            color: #fff;
          }
          .date {
            color: #fff;
          }
          .scr_num {
            color: #fff;
          }
          .full {
            color: #fff;
          }
        }
      }
    }
    .registration_date::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .doc_list {
    height: calc(100% - 270rpx);
    width: 100%;
    position: absolute;
    left: 0;
    overflow: scroll;
  }
}
</style>
