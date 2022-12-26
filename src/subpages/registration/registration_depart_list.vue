<template>
  <view class="depart_list_container">
    <SingleDepartList v-if="depart.type === 1" :departList="depart.departs" @chooseDept="chooseDept" />
  </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { reactive, ref } from "vue"
import { listDepart } from "@/apis/registration"
import SingleDepartList from "@/components/SingleDepartList.vue"

const state = reactive({ hospitalId: "", hospitalBranchId: "" })

const depart = ref({})

const loadDepartList = async (hospitalId, hospitalBranchId) => {
  const requestData = {
    hospitalId,
    hospitalBranchId,
    departType: 1,
  }
  try {
    const res = await listDepart(requestData)
    depart.value = res
  } catch (error) {
    uni.showToast({
      title: error.data.message,
      icon: "none",
    })
  }
}

const chooseDept = (dep) => {
  console.log("dep", dep)
  uni.navigateTo({
    url: `/subpages/registration/registration_doctor_list?hospitalId=${state.hospitalId}&hospitalBranchId=${state.hospitalBranchId}&departCode=${dep.departCode}&departId=${dep.departId}`,
  })
}

onLoad((op) => {
  state.hospitalId = op.hospitalId
  state.hospitalBranchId = op.hospitalBranchId
  loadDepartList(state.hospitalId, state.hospitalBranchId)
})
</script>
<style scoped lang="scss">
.depart_list_container {
}
</style>
