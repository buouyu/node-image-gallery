function getResult(data, code) {
    if (code == 401) {
        return {
            code: 401,
            msg: "没有登录信息",
            data: null,
        }
    }
    if (data instanceof Error) {
        return {
            code: 500,
            msg: data.message,
            data: null
        }
    }
    return {
        code: 0,
        msg: "",
        data: data,
    }
}
exports.getResult = getResult
exports.asyncHandler = (handler) => {
    // 401 没登陆
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            res.send(getResult(result));
        } catch (err) {
            res.send(getResult(err));
        }
    };
};

exports.md5 = (str) => {
    if (!str) {
        const timestamp = Date.now().toString(36).slice(-8)
        const randomPart = Math.random().toString(36).substr(2, 8)
        return (timestamp + randomPart).substr(0, 16)
    }
    str = String(str)
    let hash = 0
    const salt = 31  // 自定义盐值
    for (let i = 0; i < str.length; i++) {
        hash = (hash * salt + str.charCodeAt(i)) >>> 0
    }
    return hash.toString(16)
}

function formatTime(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
    const date = new Date(time)
    const o = {
        'Y+': date.getFullYear(), // 年
        'y+': date.getFullYear(), // 年
        'M+': date.getMonth() + 1, // 月
        'D+': date.getDate(), // 日
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 时
        'h+': date.getHours(), // 时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'S+': date.getMilliseconds(), // 毫秒
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(-RegExp.$1.length),
            )
        }
    }
    return fmt
}
exports.formatTime = formatTime