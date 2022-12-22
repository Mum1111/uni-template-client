import request from "@/config/requestConfig"

const listCampus = (data) => request.get(`/hos/public/v1/hospital-branch/${data.hospitalId}/list?type=${data.type}`)

export { listCampus }
