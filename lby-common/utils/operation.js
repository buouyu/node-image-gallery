import rqs from '../services/request'



export const toLoginPage = () => {
    uni.navigateTo({
        url: `/pages/login`,
    })
}