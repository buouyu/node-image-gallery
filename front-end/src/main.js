import {
	createSSRApp
} from "vue";
import uviewPlus from 'uview-plus'
import global from "lby-common/utils/global";
import {
	setEnv
} from 'lby-common/config'
import env from '@/env.js'
import App from "./App.vue";
import db from './db'
uni.gb = global
uni.db = db
setEnv(env)
export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus)
	return {
		app,
	};
}
