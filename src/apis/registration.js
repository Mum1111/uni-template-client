import request from "@/config/requestConfig"

const listCampus = (data) => request.get(`/hos/public/v1/hospital-branch/${data.hospitalId}/list?type=${data.type}`)

const listDepart = (data) => request.post(`/hos/user/v1/reg/depart`, data)

const listDepartSchedule = (data) => request.post(`/hos/user/v1/reg/depart-schedule`, data)

export { listCampus, listDepart, listDepartSchedule }
