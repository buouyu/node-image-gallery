const __DEV__ = false
let api_url = 'http://localhost:3000'
// export const api_url = import.meta.env.VITE_API_URL
// export const api_url = 'https://buouyu.cn:9000'

if (process.env.NODE_ENV === 'development') {
    api_url = 'http://localhost:3000'
    console.log('开发环境');
} else {
    api_url = 'https://buouyu.cn:9000'
    console.log('生产环境');
}
export default {
    url: api_url,
    isDev: __DEV__
}