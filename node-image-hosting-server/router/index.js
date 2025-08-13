const express = require('express')
const fs = require("fs");
const { asyncHandler, getResult } = require('./utils')
const app = express();
const path = require('path')
const prefix = '/api'
// const rootPath = path.resolve(__dirname, '../public')
const rootPath = path.resolve(process.cwd(), 'public');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'zheshiyigehenchangdezifuchuanaaaa'; // 生产中请放入环境变量
const baseDir = path.resolve(process.cwd(), 'files');
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
app.use("/files", express.static(baseDir));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "50mb" }))
app.use(express.static(rootPath))


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token
    if (!token) {
        res.send(getResult(null, 401));
        return
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            res.send(getResult(null, 401));
            return
        }
        req.jwtData = user
        next();
    });
}
function loginApis() {
    const expiresIn = '30d'
    // const user_table_name = 'user_info'
    app.post(`${prefix}/login`, asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        if (username == 'admin' && password == 'lby123321') {
            const user = {
                id: 1,
                name: 'admin'
            }
            const token = jwt.sign(user, SECRET_KEY, { expiresIn: expiresIn });
            return {
                token, user: user
            }
        } else {
            throw Error('登录失败')
        }
    }));
}
async function initExtraRouters(routes) {
    if (!routes || !routes.length) return
    for (const item of routes) {
        item.method = item.method ? item.method.toLowerCase() : 'get'
        app[item.method](`${prefix}${item.url}`, verifyToken, asyncHandler(item.handle))
    }
}
exports.verifyToken = verifyToken
exports.app = app
exports.baseDir = baseDir
exports.SECRET_KEY = SECRET_KEY
exports.initRouter = async (routes) => {
    initExtraRouters(routes)
    loginApis()
    const port = 3000;
    const url = `http://localhost:${port}`
    app.listen(port, () => {
        console.log(url)
    })
}
