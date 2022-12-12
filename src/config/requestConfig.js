import Request from "@/utils/request"

const request = new Request({
  //接口请求地址
  baseUrl: "",
  //服务器本地上传文件地址
  fileUrl: "",
  // 服务器上传图片默认url
  defaultUploadUrl: "",
  // 服务器上传文件名称
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
  // 拿去存储的用户token(暂定在vuex中存储)
}

export default request
