import JSONSearchParam from "./JSONSearchParam";
import { env } from '../config'
import { autoLogin } from '../components/pages/login/loginUtil.js'
const toLoginPage = () => {
  uni.navigateTo({
    url: `/pages/login?way=auto`,
  })
}
async function unirequest(options, times = 0) {
  const header = options.header || {}
  const token = uni.getStorageSync('token')
  if (token) {
    header.authorization = `Bearer ${token}`
  }
  let tryLoginTimes = times
  try {
    const data = await new Promise((resolve, reject) => {
      uni.request({
        url: env.BASE_URL + options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header,
        success: async (res) => {
          if (res.data.code == 0) {
            resolve(res.data.data)
          }
          if (res.data.code == 401) {
            // 没有权限 跳到登录
            reject(new Error(401))
          }
          if (res.data.code == 500) {
            reject(new Error(res.data.msg))
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
    return data
  } catch (error) {
    if (error.message == 401 && tryLoginTimes == 0) {
      await autoLogin()
      return await unirequest(options, tryLoginTimes + 1)
    } else if (error.message == 401) {
      uni.gb.showToast('请先登录')
      toLoginPage()
      throw new Error('未登录！')
    }
    throw error
  }

}
class RQS {
  async request(options) {
    try {
      const data = await unirequest(options)
      if (!options.method || options.method == "GET") {
        return data
      } else {
        return [null, data]
      }
    } catch (error) {
      if (!options.method || options.method == "GET") {
        throw Error(error.message)
      } else {
        return [error, null]
      }
    }
  }
  async get(url, data, option = {}) {
    return this.request({
      url,
      data: data || {},
      ...option
    })
  }
  async post(url, data, option = {}) {
    return this.request({
      url,
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      data: data || {},
      ...option
    })
  }
  async delete(url, data) {
    return this.request({
      url,
      method: "DELETE",
      header: {
        'Content-Type': 'application/json',
      },
      data: data || {}
    })
  }
}

export default new RQS()

export async function compressImage(tempPath, quality = 50) {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.compressImage({
      src: tempPath,
      quality: quality, // 压缩质量（0-100）
      success: compressRes => {
        resolve(compressRes.tempFilePath)
      },
      fail: err => {
        resolve(tempPath)
      }
    })
    // #endif
    // #ifdef H5
    resolve(tempPath)
    // #endif
  })
}

export function uploadFile(fileOrPath, data = {}, options = { url: '/upload' }) {
  const header = options.header || {}
  const token = uni.getStorageSync('token')
  if (token) {
    header.authorization = `Bearer ${token}`
  }
  const url = options.url || '/upload'
  const name = options.name || 'file'
  return new Promise(async (resolve, reject) => {
    if (!fileOrPath) reject(new Error('参数为空'))
    const filePath = await compressImage(fileOrPath)
    uni.uploadFile({
      url: env.BASE_URL + url,
      filePath: filePath,
      formData: data,
      enableQuic: true,
      name,
      header,
      timeout: 40000,
      async success(result) {
        const res = JSON.parse(result.data)
        if (res.code == 0) {
          resolve(res.data)
        }
        if (res.code == 401) {
          // 没有权限 跳到登录
          uni.gb.showToast('请先登录')
          toLoginPage()
          reject(new Error('未登录！'))
        }
        if (res.code == 500) {
          reject(new Error(res.data.msg))
        }
        if (result.statusCode == 413) {
          uni.gb.showToast('图片过大，上传失败')
          reject(new Error('图片过大，上传失败'))
        }
        reject(new Error('错误'))
      },
      fail(err) {

        reject(err)

      }
    })
  })
}




export class CommonRequest extends RQS {
  constructor(base) {
    super()
    if (base) {
      this.base = base
    }
  }
  async batch_save() {
    const url = this.base + '/batch_save'

  }
  async save(props) {
    //props有id就是修改，不传就是创建
    const url = this.base + '/save'
    return this.post(url, props)
  }
  async delete(id) {
    const url = this.base + '/delete'
    return super.delete(url, { id })
  }
  async get(id) {
    const url = this.base + '/get'
    return super.get(url, { id: Number(id) })
  }
  async get_one(props, callBack) {
    const url = this.base + '/get_one'
    return super.get(url, setParams(props, callBack))
  }
  async get_list(props, callBack) {
    const url = this.base + '/query_list'
    return super.get(url, setParams(props, callBack))
  }
  async get_page_list(props, page = { current: 1, size: 10 }, callBack) {
    const url = this.base + '/query_page_list'
    props.page = page
    return super.get(url, setParams(props, callBack))
  }

}

export function setParams(props, callBack) {
  // props = {
  //   phone: '123',
  //   in: [1, 2, 43],
  //   le: {
  //     phone: '123',
  //     age: 12,
  //   },
  //   ge: {
  //     phone: '123',
  //     age: 12,
  //   }
  // }
  let page = null
  const params = new JSONSearchParam()
  // params.order_desc()
  const setBykey = (key) => {
    for (const it in props[key]) {
      props[key][it] !== undefined && params[key](it, props[key][it])
    }
  }
  for (const key in props) {
    const setBykeys = ['gte', 'lte', 'gt', 'lt', 'like', 'is', 'not', 'between']
    if (setBykeys.includes(key)) {
      setBykey(key)
      continue
    }
    if (key == 'fields') {
      props[key] && params[key](props[key])
      continue
    }
    if (key == 'page') {
      page = props.page
      continue
    }
    if (Array.isArray(props[key])) {
      params.in(key, props[key])
    } else {
      props[key] !== undefined && params.eq(key, props[key])
    }
  }
  callBack && callBack(params)
  if (page) {
    return params.toPageParams(page)
  } else {
    return params.toParams()
  }
}

