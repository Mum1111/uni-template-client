import request from "@/config/requestConfig"

const h5LoginState = () => request.get(`/customer/public/api/v1/user-wx-mp/state`)

export { h5LoginState }
