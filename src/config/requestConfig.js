import Request from "@/utils/request"

const request = new Request({
  //接口请求地址
  baseUrl: "",
  //服务器本地上传文件地址
  fileUrl: "",
  // 服务器上传图片默认url
  defaultUploadUrl: "api/common/v1/upload_image",
  // 服务器上传文件名称
  defaultFileName: "file",
  //设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})

export default request
