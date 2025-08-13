# 运行前执行

npm i 安装依赖
npm run up  把代码拷贝到主项目中
npm run dev 可进行事实更新

# 新项目使用
1. 创建一个uniapp+vue3的项目
2. 引入uview-puls https://uiadmin.net/uview-plus/components/install.html
3. npm i lby-common
   安装公共库
4. 配置公共库
  根目录创建env.js
  

```js
  const __DEV__ = false
  export const api_url = __DEV__ ? 'https://test.me56.cn' : 'https://m.me56.cn'

  export default {
      api_url,
      isDev: __DEV__
  }
```

5. 再main.js中引入

```js
import global from "lby-common/utils/global";
import {
    setEnv
} from 'lby-common/config'
uni.gb = global
import env from './env'
setEnv(env)
```

6. 在vite.config.js中配置代理

```js
import env from "./env";
```

```js
{
    server: {
        cors: true, // 默认启用并允许任何源
        open: false, // vite项目启动时自动打开浏览器
        host: '0.0.0.0', //设置为0.0.0.0则所有的地址均能访问
        port: env.isDev ? 5555 : 5371,
        proxy: {
            '/api': {
                target: env.api_url, // 目标服务  
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(/^\/api/, ''),
            },

        }
    }
}
```

7. 在pages文件夹下创建并配置login.vue页面

```vue
<template>
  <view class="container">
    <Login />
  </view>
</template>

<script setup>
import Login from 'lby-common/components/pages/login/login'
</script>

<style lang="scss"></style>

```

```json
	{
			"path": "pages/login",
			"style": {
				"navigationBarTitleText": "登录"
			}
		},
```

8. 在App.vue 引入公共样式
```style
@import "lby-common/style/index.css";
```