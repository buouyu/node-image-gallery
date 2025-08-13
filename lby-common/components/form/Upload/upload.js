
import { reactive } from 'vue'
export const canvasConfig = reactive({
    width: 0,
    height: 0
})
export const addWatermark = (fileUrl) => {
    return new Promise((resolve) => {
        uni.getImageInfo({
            src: fileUrl,
            fail: (error) => {
                console.log('error', error)
            }, // 替换为你的图片路径
            success: async (res) => {
                console.log("res", res);
                const imageWidth = res.width;
                const imageHeight = res.height;
                canvasConfig.width = imageWidth;
                canvasConfig.height = imageHeight;
                setTimeout(() => {
                    addMark(res, resolve)
                }, 100);
            }
        })
    })

}


function addMark(res, resolve) {
    const imageWidth = res.width;
    const imageHeight = res.height;
    canvasConfig.width = imageWidth;
    canvasConfig.height = imageHeight;
    // #ifdef H5
    const ctx = uni.createCanvasContext('upload-canvas');
    console.log('ctx', ctx)
    ctx.drawImage(res.path, 0, 0, imageWidth,
        imageHeight);
    ctx.setFontSize(16);
    ctx.setFillStyle('rgba(255, 0, 0, 1)'); // 设置水印颜色和透明度
    const lineHeight = 20; // 水印文字行高
    // const lines = that.watermarkText
    //     .split('\n');
    const lines = ['aaaddd', '12344']
    const x = 10; // 水印左上角 x 坐标
    let y = 20; // 水印左上角 y 坐标

    lines.forEach((line) => {
        ctx.fillText(line, x,
            y);
        y += lineHeight;
    });
    ctx.stroke();
    ctx.draw(false, () => {
        // 保存Canvas绘制结果为临时文件
        uni.canvasToTempFilePath({
            canvasId: 'upload-canvas',
            success: (res) => {
                resolve(res.tempFilePath)
                console.log('res', res)
                // 将临时文件路径保存到数组中
            },
            fail: (error) => {
                console.error('Failed to save canvas:',
                    error);
            },
        }, this);
    });
    // #endif
}
