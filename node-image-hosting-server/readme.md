

请你用node，帮我写一个简单的图床程序， 存在一个固定储存资源的文件夹files,请你帮我写一个接口，接口的传参是文件的路径和文件buffer数据，用于上传文件到files



http://localhost:3000/files/aaaa.jpg

在node中，请根据我传的路径，新建文件夹，如果文件夹已存在，则抛出错误
例如传/aaaa/dsss 则新建dsss文件夹

在node程序中，通过下面这种方式拿到的文件，如何储存在指定的文件夹中
const multer = require('multer');
const prefix = '/api'
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(`${prefix}/upload`, verifyToken, upload.single('file'), asyncHandler(async (req) => {
    const originalnamearr = req.file.originalname.split('.')
    const suffix = originalnamearr[originalnamearr.length - 1]

}))


http://localhost:3000/files/公众号：非哥黑科技1528.jpg