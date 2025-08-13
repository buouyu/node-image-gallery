
import rqs from 'lby-common/services/request'
export async function onLoginSuccess(data) {
	uni.setStorageSync('token', data.token)
	const user = await rqs.get('/user_info/get', { id: data.user.id })
	uni.setStorageSync('user', user)
	user.is_new_register = data.is_new_register
	return user
}
export async function saveUserInfo(data) {
	await rqs.post('/user_info/save', data)
	const user = await rqs.get('/user_info/get', { id: data.id })
	if (user) {
		uni.setStorageSync('user', user)
	}
}

export async function h5login(loginData) {
	const [err, data] = await rqs.post("/login", loginData);
	if (err) return uni.gb.showToast(err.message);
	return onLoginSuccess(data);
}


export function wxlogin() {
	// #ifdef MP-WEIXIN
	return new Promise((resolve, reject) => {
		wx.login({
			success: async (res) => {
				const data = await rqs.get('/wxlogin', { code: res.code })
				// uni.setStorageSync('token', data.token)
				// uni.setStorageSync('user', user)
				const user = await onLoginSuccess(data)
				resolve(user)
			},
			fail: () => {
				reject('获取登录信息失败')
			}
		});
	})
	// #endif
}

export async function autoLogin() {
	console.log('尝试登录-----44')
	// #ifdef H5
	uni.navigateTo({
		url: `/pages/login?way=auto`,
	})
	// return await h5login({
	// 	username: "lby001",
	// 	password: "lby7890",
	// })
	// #endif
	// #ifdef MP-WEIXIN
	return await wxlogin()
	// #endif
}




