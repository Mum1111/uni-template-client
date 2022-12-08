import { dispatchRequest, jsonpRequest, mergeConfig } from "./utils"

export default class Request {
  constructor(options) {
    //请求公共地址
    this.baseUrl = options.baseUrl || ""
    //公共文件上传请求地址
    this.fileUrl = options.fileUrl || ""
    // 超时时间
    this.timeout = options.timeout || 6000
    // 服务器上传图片默认url
    this.defaultUploadUrl = options.defaultUploadUrl || ""
    // 服务器上传文件名称
    this.defaultFileName = options.defaultFileName || ""
    //默认请求头
    this.header = options.header || {}
    //默认配置
    this.config = options.config || {
      isPrompt: true,
      load: true,
      isFactory: true,
      resend: 0,
    }
  }

  get(url = "", data = {}, options = {}) {
    return this.request({
      method: "GET",
      data,
      url,
      ...options,
    })
  }

  async request(data) {
    let requestInfo
    let runRequestStart = false
    if (!data.url) {
      throw new Error({ errMsg: "url不能为空", statusCode: 0 })
    }
    try {
      requestInfo = mergeConfig(this, data)
      runRequestStart = true
      // 请求拦截器

      // 发起请求
      let requestResult = {}
      if (requestInfo.method === "JSONP") {
        requestResult = await jsonpRequest(requestInfo)
      } else {
        requestResult = await dispatchRequest(requestInfo)
      }

      // 响应拦截器

      // 输出结果
      return Promise.resolve(requestResult)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      if (runRequestStart) {
        // 结束请求
      }
    }
  }
}
