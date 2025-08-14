import { defineConfig } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import env from './src/env.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    {
      name: 'watch-lby-common',
      configureServer: (server) => {
        const modules = ['lby']
        let pattern = `/node_modules\\/(?!${modules.join('|')}).*/`;
        console.log('pattern', pattern)
        const node_modules_i = server.watcher.options.ignored.indexOf('**/node_modules/**');
        server.watcher.options.ignored.splice(node_modules_i, 1, new RegExp(pattern));
        server.watcher._userIgnored = undefined;
      },
    },
  ],
  optimizeDeps: {
    // force: true,
    exclude: ['lby-common'], // 替换为你不想缓存的文件夹或包
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // @ -> src
    }
  },
  server: {
    cors: true, // 默认启用并允许任何源
    open: false, // vite项目启动时自动打开浏览器
    host: '0.0.0.0', //设置为0.0.0.0则所有的地址均能访问
    // http://localhost:9191
    // port: env.isDev ? 5555 : 5371,
    proxy: {
      '/api': {
        target: env.url, // 目标服务  
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
