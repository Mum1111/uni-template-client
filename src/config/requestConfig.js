import Request from "@/utils/request"
import { useUserInfoStore } from "@/store/modules/user"

const request = new Request({
  //接口请求地址
  baseUrl: "",
  //服务器本地上传文件地址
  fileUrl: "",
  // 服务器上传图片默认url
  defaultUploadUrl: "",
  // 服务器上传文件名称Unexpected token importeslint
  defaultFileName: "file",
  //设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})

request.requestInterceptors = function (options) {
  if (options.load) {
    // 启动加载
    uni.showLoading({
      mask: true,
      title: "加载中...",
    })
  }

  // 在请求头中加入token
  const store = useUserInfoStore()
  const token = store.authToken
  if (token) {
    options.header.Authorization = "Bearer " + token
  }

  return options
}

request.requestEnd = function (options) {
  if (options.load) {
    uni.hideLoading()
  }
}

request.dataFactory = async function (res) {
  return Promise.resolve(res)
}

request.requestError = function (e) {
  // 如果是401 或者 403 重新登陆
  if (e.statusCode === 0) {
    throw e
  } else {
    uni.showToast({
      title: "网络错误，请检查网络",
      icon: "none",
    })
  }
}

export default request
