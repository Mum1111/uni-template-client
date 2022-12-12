/**
 * 本地存储模块
 */

const setItem = (name, value) => {
  let data = value
  if (typeof value === "object") {
    data = JSON.stringify(value)
  }

  uni.setStorageSync(name, data)
}

const getItem = (name) => {
  const data = uni.getStorageSync(name)

  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

const removeItem = (name) => {
  uni.removeStorageSync(name)
}

export { setItem, getItem, removeItem }
