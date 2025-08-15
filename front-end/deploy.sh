#!/bin/bash
export prot=49000
export host=root@8.141.116.147
export path=/root/services/node-image-gallery/node-image-hosting-server

upload() {
    echo "正式环境更新"
    npm run build
    mv dist/build/h5 $1
    zip -r $1.zip $1
    scp -P $prot $1.zip $host:$path
    rm -rf $1.zip
    rm -rf $1
    ssh -p $prot $host "
    cd $path &&
    unzip -o $1.zip &&
    rm -rf $1.zip &&
    ls
    "
    # echo "正式环境更新成功"
}
case $1 in
    test)
        # echo "Upload some files"
        # ssh -p 26579 root@106.52.250.251 "rm -rf /var/www/enjoy_meeting/*"
        # scp -r -P 26579 unpackage/dist/build/web/* root@106.52.250.251:/var/www/enjoy_meeting
    ;;
    upf)
        upload "public"
    ;;
    up)
        echo "更新"
        rm -rf dist
        rm -rf ../node-image-hosting-server/public/*
        npm run build
        cp -r dist/build/h5/* ../node-image-hosting-server/public
    ;;
    
    status)
        echo "Checking the service status..."
        # 这里放置检查服务状态的命令
    ;;
    *)
        echo "Invalid option: $1"
        echo "Usage: $0 {start|stop|status}"
        exit 1
    ;;
esac