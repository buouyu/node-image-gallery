import { toQueryString } from "./utilFns";
class Global {
    showErr(msg, err) {
        uni.hideLoading();
        if (msg) {
            uni.showToast({
                title: msg,
                icon: 'none',
                duration: 2000
            })
        } else if (err && err.message) {
            uni.showToast({
                title: err.message,
                icon: 'none',
                duration: 2000
            })
        }
        return false
    }
    showToast(msg) {
        uni.hideLoading();
        uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
        })
    }
    showSuccess(msg) {
        uni.hideLoading();
        uni.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
        })
        return true
    }
    loading(prop = '加载中') {
        // prop 为 false 则为关闭loading
        if (prop == false) {
            uni.hideLoading();
        } else {
            uni.showLoading({
                title: prop
            });
        }
    }
    getUserInfo() {
        const userInfo = uni.getStorageSync('user')
        return userInfo || {}
    }
    queryData = {}
    push(path, params, type = 'navigate') {
        // type navigate  tab
        if (params && JSON.stringify(params) != '{}') {
            this.queryData = this.deepCopy(params)
            path = path + '?' + toQueryString(params)
        } else {
            this.queryData = {}
        }
        if (type == 'navigate') {
            uni.navigateTo({
                url: path
            })
        } else if (type == 'tab') {
            uni.switchTab({
                url: path
            });
        }
    }
    back(num = 1) {
        uni.navigateBack({
            delta: num
        });
    }
    getRoute() {
        const pages = getCurrentPages();
        const currentPage = pages.at(-1);
        const options = currentPage.options;
        if (options) {
            for (const key in options) {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    const item = decodeURIComponent(options[key]);
                    options[key] = item
                }
            }
            return options
        } else {
            return this.queryData
        }
    }
    deepCopy(data) {
        return JSON.parse(JSON.stringify(data))
    }
    getStorage(key) {
        const value = uni.getStorageSync(key);
        return value
    }
    setStorage(key, value) {
        uni.setStorageSync(key, value);
    }
    getPlatform() {
        // ios, android, mac(3.1.10+), windows(3.1.10+), linux
        return new Promise(resolve => {
            uni.getSystemInfo({
                success(res) {
                    resolve(res.platform)
                },
                fail() {
                    resolve('')
                }
            })
        })
    }
    showModal(option = {}) {
        return new Promise((resolve, reject) => {
            uni.showModal({
                ...option,
                cancelText: '取消',
                confirmText: '确认',
                success: function (res) {
                    if (res.confirm) {
                        resolve(true)
                    } else if (res.cancel) {
                        reject()
                    }
                }
            });
        })
    }
    showActionSheet({ itemList, title }) {
        return new Promise((resolve, reject) => {
            uni.showActionSheet({
                title: title,
                alertText: title,
                itemList: itemList,
                success(res) {
                    resolve(res.tapIndex)
                },
                fail(res) {
                    reject(res.errMsg)
                }
            })
        })
    }
}
export default new Global