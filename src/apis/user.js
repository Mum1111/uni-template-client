import { get } from "@/config/requestConfig"

const login = () => get("/api/test")

export { login }
