import request from "@/config/requestConfig"

const h5LoginState = () => request.get(`/customer/public/api/v1/user-wx-mp/state`)

const h5Auth = (data) => request.post("/customer/public/api/v1/user-wx-mp/1/auth", data)

export { h5LoginState, h5Auth }
