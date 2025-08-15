#!/bin/bash
export prot=49000
export host=root@8.141.116.147
export path=/root/services/node-image-gallery
upload() {
    echo "正式环境更新"
    rm -rf dist
    node script.js start
    npm run build
    node script.js end
    cp package.json dist
    mv dist/index.js dist/$1.js
    mv dist $1
    zip -r $1.zip $1
    scp -P $prot $1.zip $host:$path
    rm -rf $1.zip
    mv $1 dist
    ssh -p $prot $host "
    cd $path &&
    pm2 stop $1 &&
    rm -rf $1 &&
    unzip -o $1.zip &&
    rm -rf $1.zip &&
    cd $1 &&
    pm2 start $1.js
    "
    echo "正式环境更新成功"
}
# pm2 stop $1.js &&
# pm2 stop $1 &&
# rm -rf $1 &&
case $1 in
    up)
        upload "node-image-hosting-server"
    ;;
    test)
        scp -P $prot -r files $host:$path
    ;;
    *)
        echo "Invalid option: $1"
        echo "Usage: $0 {start|stop|status}"
        exit 1
    ;;
esac