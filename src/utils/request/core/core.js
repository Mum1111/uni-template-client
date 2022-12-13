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
      isPrompt: true, //（默认 true 说明：本接口抛出的错误是否提示）
      load: true, //（默认 true 说明：本接口是否提示加载动画）
      isFactory: true, //（默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
      resend: 0, // 当前重发次数
    }
  }

  /**
   *
   * @param {String} url
   * @param {Object} data
   * @param {Object} options
   * @returns
   */
  get(url = "", data = {}, options = {}) {
    return this.request({
      method: "GET",
      data,
      url,
      ...options,
    })
  }

  /**
   *
   * @param {String} url
   * @param {Object} data
   * @param {Object} options
   * @returns
   */
  post(url = "", data = {}, options = {}) {
    return this.request({
      method: "POST",
      data: data,
      url: url,
      ...options,
    })
  }

  /**
   *
   * @param {String} url
   * @param {Object} data
   * @param {Object} options
   * @returns
   */
  put(url = "", data = {}, options = {}) {
    return this.request({
      method: "PUT",
      data: data,
      url: url,
      ...options,
    })
  }

  /**
   *
   * @param {String} url
   * @param {Object} data
   * @param {Object} options
   * @returns
   */
  delete(url = "", data = {}, options = {}) {
    return this.request({
      method: "DELETE",
      data: data,
      url: url,
      ...options,
    })
  }

  /**
   *
   * @param {String} url
   * @param {Object} data
   * @param {Object} options
   * @returns
   */
  jsonp(url = "", data = {}, options = {}) {
    return this.request({
      method: "JSONP",
      data: data,
      url: url,
      ...options,
    })
  }

  async request(data) {
    console.log("url", data.url)
    let requestInfo
    let runRequestStart = false
    if (!data.url) {
      throw new Error({ errMsg: "url不能为空", statusCode: 0 })
    }
    try {
      requestInfo = mergeConfig(this, data)
      runRequestStart = true
      // 请求拦截器
      if (this.requestInterceptors) {
        const interceptor = this.requestInterceptors(requestInfo)
        if (typeof interceptor === "object") {
          const changekeys = ["data", "header", "isPrompt", "load", "isFactory"]
          changekeys.forEach((key) => {
            requestInfo[key] = interceptor[key]
          })
        } else {
          throw new Error({
            errMsg: "请求拦截器未通过",
            statusCode: 0,
            data: requestInfo.data,
            method: requestInfo.method,
            header: requestInfo.header,
            url: requestInfo.url,
          })
        }
      }
      // 发起请求
      let requestResult = {}
      if (requestInfo.method === "JSONP") {
        requestResult = await jsonpRequest(requestInfo)
      } else {
        requestResult = await dispatchRequest(requestInfo)
      }

      // 响应拦截器
      if (requestInfo.isFactory && this.dataFactory) {
        //数据处理
        const result = await this.dataFactory({
          ...requestInfo,
          response: requestResult,
        })
        return Promise.resolve(result)
      }
      // 输出结果
      return Promise.resolve(requestResult)
    } catch (error) {
      console.log("error", error)
      if (this.requestError) {
        this.requestError(error)
      }
      return Promise.reject(error)
    } finally {
      if (runRequestStart && this.requestEnd) {
        // 结束请求
        this.requestEnd(requestInfo)
      }
    }
  }
}
