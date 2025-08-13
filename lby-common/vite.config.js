import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs/promises';
export default defineConfig({
    plugins: [
        {
            name: 'move-on-change',
            configureServer(server) {
                // const targetName = 'miyang-main-uni'
                const targetName = 'uni-project-template'
                const watchDir = path.resolve(__dirname, './'); // 要监听的文件夹
                const targetDir = path.resolve(__dirname, `../${targetName}/node_modules/lby-common`); // 要移动到的目标文件夹
                // 确保目标文件夹存在
                fs.mkdir(targetDir, { recursive: true }).catch(console.error);
                // 监听文件变化
                server.watcher.on('change', async (filePath) => {
                    if (filePath.startsWith(watchDir)) {
                        const relativePath = filePath.slice(watchDir.length)
                        const fullPath = targetDir + relativePath
                        const directoryPath = path.dirname(fullPath);
                        try {
                            await fs.mkdir(directoryPath, { recursive: true })
                            const fileName = path.basename(filePath);
                            await fs.copyFile(filePath, fullPath);
                            console.log(`[Moved] ${fileName} -> ${fullPath}`);
                        } catch (err) {
                            console.error('Error moving file:', err);
                        }
                    }
                });
            },
        },
    ],
    server: {
        cors: true, // 默认启用并允许任何源
        open: false, // vite项目启动时自动打开浏览器
        host: '0.0.0.0', //设置为0.0.0.0则所有的地址均能访问
        port: 9494
    }
});
