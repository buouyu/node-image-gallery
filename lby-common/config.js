import { reactive } from 'vue'

export const env = reactive({
    url: '',
    BASE_URL: ''
})

export const setEnv = (opt) => {
    env.url = opt.url
    const prefix = '/api'
    // #ifdef H5
    env.BASE_URL = prefix
    // #endif
    // #ifdef MP
    env.BASE_URL = env.url + prefix
    // #endif
}

export const loginConfig = reactive({
    jumpType: 'bar',//page 或者 bar
    jumpPage: '/pages/index/index'
})

export const setLoginConfig = (opt) => {
    for (const key in opt) {
        loginConfig[key] = opt[key]
    }
}