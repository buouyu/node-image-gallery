const { app, baseDir, verifyToken } = require('./index.js')
const { asyncHandler, md5, formatTime } = require('./utils.js')
const { fileBaseUrl } = require('../config.js')
const fs = require("fs");
const multer = require('multer');
const path = require("path");
const prefix = '/api'
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const routers = [
    {
        url: '/file_list',
        async handle({ query }) {
            const targetPath = path.join(baseDir, query.path || "");
            if (!fs.existsSync(targetPath)) {
                throw Error('目录不存在')
            }
            const files = fs.readdirSync(targetPath).map(name => {
                const fullPath = path.join(targetPath, name);
                const stat = fs.statSync(fullPath);
                const isdirectory = stat.isDirectory()
                return {
                    name,
                    type: isdirectory ? "directory" : "file",
                    fullPath: `${fileBaseUrl}${query.path}/${name}`,
                    // ext: isdirectory ? null : path.extname(name).toLowerCase(), // 文件扩展名
                    size: isdirectory ? null : stat.size,       // 文件大小（字节），文件夹为 null
                    modifiedTime: stat.mtime
                };
            });
            return files
        }
    }, {
        url: '/delete_file',
        method: 'DELETE',
        async handle({ body }) {
            const targetPath = path.join(baseDir, body.path || "");
            if (!fs.existsSync(targetPath)) {
                throw Error('路径不存在')
            }
            const stat = fs.statSync(targetPath);
            if (stat.isDirectory()) {
                // 删除文件夹（递归）
                fs.rmSync(targetPath, { recursive: true, force: true });
                return true
            } else if (stat.isFile()) {
                // 删除文件
                fs.unlinkSync(targetPath);
                return true
            } else {
                throw Error('路径不是文件或文件夹')
            }
        }
    }, {
        url: '/makedir',
        method: 'POST',
        async handle({ body }) {
            const targetPath = path.join(baseDir, body.path || "");
            if (fs.existsSync(targetPath)) {
                throw new Error(`文件夹已存在`);
            }
            fs.mkdirSync(targetPath, { recursive: true });
            return true
        }
    }
]

async function checkFile(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK);
        console.log('文件存在');
        return true
    } catch {
        console.log('文件不存在');
        return false
    }
}
app.post(`${prefix}/upload`, verifyToken, upload.single('file'), asyncHandler(async (req) => {

    // const name = md5()
    // const originalnamearr = req.file.originalname.split('.')
    // const suffix = originalnamearr[originalnamearr.length - 1]
    // const date = formatTime(new Date(), 'YYYY-MM').split('-')
    const mypath = req.body.path
    const targetPath = path.join(baseDir, mypath);
    const isExist = await checkFile(targetPath)
    if (isExist) {
        throw Error('文件已存在')
    }
    fs.writeFileSync(targetPath, req.file.buffer);
    return `${fileBaseUrl}${mypath}`
}))

module.exports = routers