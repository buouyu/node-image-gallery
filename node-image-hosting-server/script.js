// scripts/replace-env.js
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2); // 从第 2 个开始才是自定义参数
console.log('自定义参数:', args);
if (!args[0]) {
    process.exit(1);
}
// 开发环境
const developments = [
    'http://localhost:8989/files'
]
const production = [
    'https://buouyu.cn:8888/files'
]
const targetFile = path.resolve(__dirname, './config.js'); // 根据实际路径修改
try {
    let content = fs.readFileSync(targetFile, 'utf8');
    // 简单字符串替换
    if (args[0] == 'start') {
        const regex = new RegExp(developments[0], "g");
        content = content.replace(regex, production[0]);
    } else if (args[0] == 'end') {
        const regex = new RegExp(production[0], "g");
        content = content.replace(regex, developments[0]);
    }
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log(`✅ 替换完成`);
} catch (error) {
    console.error('❌ 替换失败:', error);
    process.exit(1);
}
