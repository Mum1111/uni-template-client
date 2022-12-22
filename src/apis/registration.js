import request from "@/config/requestConfig"

const listCampus = (data) => request.get(`/hos/public/v1/hospital-branch/${data.hospitalId}/list?type=${data.type}`)

const listDepart = (data) => request.post(`/hos/user/v1/reg/depart`, data)

export { listCampus, listDepart }
