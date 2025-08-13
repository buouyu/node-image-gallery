#!/bin/bash
# export namePath=pi@$path
target="front-end"
# target="print-test"

case $1 in
    test)
        # echo "Upload some files"
        # ssh -p 26579 root@106.52.250.251 "rm -rf /var/www/enjoy_meeting/*"
        # scp -r -P 26579 unpackage/dist/build/web/* root@106.52.250.251:/var/www/enjoy_meeting
    ;;
    upf)
        
    ;;
    up)
        echo "Hello, ${target}123"
        cd ..
        rm -rf $target/unpackage/dist
        rm -rf $target/node_modules/.vite
        rm -rf $target/node_modules/lby-common
        mkdir $target/node_modules/lby-common
        cp -rfv lby-common/services $target/node_modules/lby-common/services
        cp -rfv lby-common/utils $target/node_modules/lby-common/utils
        cp -rfv lby-common/components $target/node_modules/lby-common/components
        cp -rfv lby-common/style $target/node_modules/lby-common/style
        cp -rfv lby-common/hooks $target/node_modules/lby-common/hooks
        cp -rfv lby-common/package.json $target/node_modules/lby-common/package.json
        cp -rfv lby-common/config.js $target/node_modules/lby-common/config.js
        cp -rfv lby-common/index.js $target/node_modules/lby-common/index.js
        cp -rfv lby-common/index.d.ts $target/node_modules/lby-common/index.d.ts
        #    cp -rfv  lby-common miyang-main-wxmp/node_modules
        #    cp -rfv lby-common miyang-main-wxmp
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