const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;
app.use(express.static('public'))
const baseDir = path.join(__dirname, "files");
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

app.use(express.json({ limit: "50mb" }));
app.use("/files", express.static(baseDir));

/**
 * 获取目录结构
 */
app.get("/api/list", (req, res) => {
    const targetPath = path.join(baseDir, req.query.path || "");
    if (!fs.existsSync(targetPath)) {
        return res.status(404).json({ error: "目录不存在" });
    }
    const files = fs.readdirSync(targetPath).map(name => {
        const fullPath = path.join(targetPath, name);
        const stat = fs.statSync(fullPath);
        const isdirectory = stat.isDirectory()
        return {
            name,
            type: isdirectory ? "directory" : "file",
            size: isdirectory ? null : stat.size,       // 文件大小（字节），文件夹为 null
            modifiedTime: stat.mtime
        };
    });
    res.json({ files });
});

/**
 * 上传文件接口（form-data）
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirPath = path.join(baseDir, req.body.targetPath || "");
        fs.mkdirSync(dirPath, { recursive: true });
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "上传成功" });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
