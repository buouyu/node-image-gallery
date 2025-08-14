#!/bin/bash


case $1 in
    test)
        # echo "Upload some files"
        # ssh -p 26579 root@106.52.250.251 "rm -rf /var/www/enjoy_meeting/*"
        # scp -r -P 26579 unpackage/dist/build/web/* root@106.52.250.251:/var/www/enjoy_meeting
    ;;
    upf)
        
    ;;
    up)
       
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