export const mergeConfig = (_this, options) => {
  // 判断url是不是链接
  const urlType = /^(http|https):\/\//.test(options.url)
  const config = Object.assign(_this.config, options, { timeout: _this.timeout })

  if (options.method === "FILE") {
    config.url = urlType ? options.url : _this.fileUrl + options.url
  } else {
    config.url = urlType ? options.url : _this.baseUrl + options.url
  }

  if (options.header) {
    config.header = Object.assign({}, _this.header, options.header)
  } else {
    config.header = Object.assign({}, _this.header)
  }

  return config
}

// 常规请求
export const dispatchRequest = (requestInfo) => {
  const { url, header, method, data, timeout, dataType, responseType, withCredentials } = requestInfo

  return new Promise((resolve, reject) => {
    let requestAbort = true
    const requestData = {
      url,
      header,
      success: (res) => {
        requestAbort = false
        resolve(res)
      },
      fail: (err) => {
        requestAbort = false
        if (err.errMsg === "request:fail abort") {
          reject(
            new Error({
              errMsg: "请求超时，请重新尝试",
              statusCode: 0,
            })
          )
        } else {
          reject(err)
        }
      },
    }

    if (method) {
      requestData.method = method
    }
    if (data) {
      requestData.data = data
    }
    // #ifdef MP-WEIXIN || MP-ALIPAY
    if (timeout) {
      requestData.timeout = timeout
    }
    // #endif
    if (dataType) {
      requestData.dataType = dataType
    }
    // #ifndef APP-PLUS || MP-ALIPAY
    if (responseType) {
      requestData.responseType = responseType
    }
    // #endif
    // #ifdef H5
    if (withCredentials) {
      requestData.withCredentials = withCredentials
    }
    // #endif
    console.log("requestData", requestData)
    const requestTask = uni.request(requestData)

    setTimeout(() => {
      if (requestAbort) {
        requestTask.abort()
      }
    }, requestInfo.timeout)
  })
}

// jsonp请求
export const jsonpRequest = function (requestInfo) {
  return new Promise((resolve) => {
    let dataStr = ""
    Object.keys(requestInfo.data).forEach((key) => {
      dataStr += key + "=" + requestInfo.data[key] + "&"
    })
    //匹配最后一个&并去除
    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"))
    }
    const url = requestInfo.url + "?" + dataStr
    const callbackName = "callback" + Math.ceil(Math.random() * 1000000)
    // #ifdef H5
    window[callbackName] = function (data) {
      resolve(data)
    }
    const script = document.createElement("script")
    script.src = url + "&callback=" + callbackName
    document.head.appendChild(script)
    // 及时删除，防止加载过多的JS
    document.head.removeChild(script)
    // #endif
  })
}
