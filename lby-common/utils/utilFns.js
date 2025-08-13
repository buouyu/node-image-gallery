export function generateUUID() {
  return 'xxxxxxx4xxxyxxxxxxxxxxxxx3xxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function formatTime(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
  let date = new Date()
  if (time) {
    date = new Date(time)
  }
  const o = {
    'Y+': date.getFullYear(), // 年
    'y+': date.getFullYear(), // 年
    'M+': date.getMonth() + 1, // 月
    'D+': date.getDate(), // 日
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 时
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S+': date.getMilliseconds(), // 毫秒
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(-RegExp.$1.length),
      )
    }
  }
  return fmt
}

export function random(start, end) {
  const min = Math.ceil(start);
  const max = Math.floor(end);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toQueryString(obj) {
  const getVal = (val) => {
    if(typeof val == 'string' && val){
      return encodeURIComponent(val)
    }else{
      return val
    }
  }
  return Object.keys(obj)
    .map(key => `${key}=${getVal(obj[key])}`)
    .join('&')
}
export function parseQuery(url = '') {
  const qs = url.split('?')[1] || ''
  return Object.fromEntries(
    qs.split('&').filter(Boolean).map(p => {
      const [k, v = ''] = p.split('=')
      return [decodeURIComponent(k), decodeURIComponent(v)]
    })
  )
}
export function md5(str) {
  if (!str) {
    const timestamp = Date.now().toString(36).slice(-8)
    const randomPart = Math.random().toString(36).substr(2, 8)
    return (timestamp + randomPart).substr(0, 16)
  }
  str = String(str)
  let hash = 0
  const salt = 31  // 自定义盐值
  for (let i = 0; i < str.length; i++) {
    hash = (hash * salt + str.charCodeAt(i)) >>> 0
  }
  return hash.toString(16)
}

