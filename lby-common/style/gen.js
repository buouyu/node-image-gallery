const fs = require('fs');

//生成farame.css文件
function generateCSS(outputFile) {
    let cssContent = '';

    // 生成 .m-1 到 .m-4 的规则
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.m-${i} {\n  margin: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.ml-${i} {\n  margin-left: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.mr-${i} {\n  margin-right: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.mt-${i} {\n  margin-top: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.mb-${i} {\n  margin-bottom: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.mx-${i} {\n  margin-right: ${marginValue};\n margin-left: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.my-${i} {\n  margin-top: ${marginValue};\n margin-bottom: ${marginValue};\n}\n\n`;
    }
    cssContent += `.m-auto {\n  margin:auto ;\n}\n\n`;
    cssContent += `.mt-auto {\n  margin-top:auto ;\n}\n\n`;
    cssContent += `.ml-auto {\n  margin-left:auto ;\n}\n\n`;
    cssContent += `.mb-auto {\n  margin-bottom:auto ;\n}\n\n`;
    cssContent += `.mr-auto {\n  margin-right:auto ;\n}\n\n`;
    cssContent += `.mx-auto {\n  margin-left:auto ;\nmargin-right:auto ;\n}\n\n`;
    cssContent += `.my-auto {\n margin-top:auto ;\nmargin-bottom:auto ;\n}\n\n`;


    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.p-${i} {\n  padding: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.pl-${i} {\n  padding-left: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.pr-${i} {\n  padding-right: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.pt-${i} {\n  padding-top: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.pb-${i} {\n  padding-bottom: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.px-${i} {\n  padding-right: ${marginValue};\n padding-left: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.py-${i} {\n  padding-top: ${marginValue};\n padding-bottom: ${marginValue};\n}\n\n`;
    }

    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.w-${i} {\n  width: ${marginValue};\n}\n\n`;
    }
    for (let i = 1; i <= 12; i++) {
        const num = 100 * i / 12
        const marginValue = `${num.toFixed(2)}%`;
        cssContent += `.w-${i}-12 {\n  width: ${marginValue};\n}\n\n`;
    }
    for (let i = 0; i <= 8; i++) {
        const marginValue = `${0.5 * i}rem`;
        cssContent += `.h-${i} {\n  height: ${marginValue};\n}\n\n`;
    }
    for (let i = 1; i <= 12; i++) {
        const num = 100 * i / 12
        const marginValue = `${num.toFixed(0)}%`;
        cssContent += `.h-${i}-12 {\n  height: ${marginValue};\n}\n\n`;
    }

    cssContent += `.w-full {\n  width: 100%;\n}\n\n`;
    cssContent += `.h-full {\n  height: 100%;\n}\n\n`;

    //   cssContent += `.border {\n  border: 1px solid #ccc;\n}\n\n`;
    const sizeArr = ['-none', '-sm', '', '-md', '-lg', '-xl', '-2xl', '-3xl']
    for (let i = 0; i < sizeArr.length; i++) {
        const marginValue = `${0.125 * i}rem`;
        cssContent += `.rounded${sizeArr[i]} {\n  	border-radius: ${marginValue};\n}\n\n`;
    }
    cssContent += `.rounded-full {\n  height: 9999px;\n}\n\n`;



    // 将内容写入 CSS 文件
    fs.writeFile(outputFile, cssContent, (err) => {
        if (err) {
            console.error('文件写入失败:', err);
        } else {
            console.log('CSS 文件生成成功:', outputFile);
        }
    });
}
// 指定生成的 CSS 文件路径
const outputFilePath = './styles.css';
generateCSS(outputFilePath);


// // -------- 生成location.css文件----
// const fs = require('fs');

// // 生成 CSS 文件的函数
// function generateCSS(outputFile) {
//     let cssContent = '';
//     cssContent += `.absolute {\n  position: absolute;\n}\n\n`;
//     cssContent += `.fixed {\n  position: fixed;\n}\n\n`;
//     cssContent += `.relative {\n  position: relative;\n}\n\n`;
//     cssContent += `.static {\n  position: static;\n}\n\n`;
//     cssContent += `.sticky {\n  position: sticky;\n}\n\n`;

//     const arr = ['top', 'right', 'left', 'bottom']
//     for (let j = 0; j < arr.length; j++) {
//         for (let i = 0; i <= 8; i++) {
//             const marginValue = `${0.5 * i}rem`;
//             cssContent += `.${arr[j]}-${i} {\n  ${arr[j]}: ${marginValue};\n}\n\n`;
//         }
//         for (let i = 1; i <= 12; i++) {
//             const num = 100 * i / 12
//             const marginValue = `${num.toFixed(0)}%`;
//             cssContent += `.${arr[j]}-${i}-12 {\n  ${arr[j]}: ${marginValue};\n}\n\n`;
//         }
//     }
//     cssContent += `.box-border {\n  box-sizing: border-box;\n}\n\n`;
//     cssContent += `.box-content {\n  box-sizing: box-content;\n}\n\n`;

//     cssContent += `.flex {\n  display: flex;\n}\n\n`;
//     cssContent += `.block {\n  display: block;\n}\n\n`;
//     cssContent += `.inline {\n  display: inline;\n}\n\n`;

//     cssContent += `.flex-wrap {\n  flex-wrap: wrap;\n}\n\n`;
//     cssContent += `.flex-wrap-reverse {\n  flex-wrap: wrap-reverse;\n}\n\n`;
//     cssContent += `.flex-nowrap {\n  flex-wrap: nowrap;\n}\n\n`;

//     for (let i = 1; i <= 8; i++) {
//         const marginValue = `${i}`;
//         cssContent += `.flex-${i} {\n  flex: ${marginValue};\n}\n\n`;
//     }
//     cssContent += `.justify-normal {\n  justify-content: normal;\n}\n\n`;
//     cssContent += `.justify-start {\n  justify-content: flex-start;\n}\n\n`;
//     cssContent += `.justify-end {\n  justify-content: flex-end;\n}\n\n`;
//     cssContent += `.justify-center {\n justify-content: center;\n}\n\n`;
//     cssContent += `.justify-between {\n  justify-content: space-between;\n}\n\n`;
//     cssContent += `.justify-around {\n  justify-content: space-around;\n}\n\n`;
//     cssContent += `.justify-evenly {\n  justify-content: space-evenly;\n}\n\n`;


//     cssContent += `.content-normal {\n  align-content: normal;\n}\n\n`;
//     cssContent += `.content-start {\n  align-content: flex-start;\n}\n\n`;
//     cssContent += `.content-end {\n  align-content: flex-end;\n}\n\n`;
//     cssContent += `.content-center {\n align-content: center;\n}\n\n`;
//     cssContent += `.content-between {\n  align-content: space-between;\n}\n\n`;
//     cssContent += `.content-around {\n  align-content: space-around;\n}\n\n`;
//     cssContent += `.content-evenly {\n  align-content: space-evenly;\n}\n\n`;


//     // 将内容写入 CSS 文件
//     fs.writeFile(outputFile, cssContent, (err) => {
//         if (err) {
//             console.error('文件写入失败:', err);
//         } else {
//             console.log('CSS 文件生成成功:', outputFile);
//         }
//     });
// }
// // 指定生成的 CSS 文件路径
// const outputFilePath = './styles.css';
// generateCSS(outputFilePath);

