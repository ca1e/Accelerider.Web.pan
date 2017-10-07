#!/bin/bash

user=`whoami`
userpath='/Users/'$user
downloadpath=$userpath'/Downloads'
rpcpass='combo$$c2web'
rpcport='6802'
#userpath=$userpath'/Documents/test' ##zhuhi
cd $userpath
mkdir .aria2
cd .aria2
rm -rf *
echo 'rpc-secret='$rpcpass   >  aria2.conf && \
echo 'dir='$downloadpath             >> aria2.conf && \
echo 'rpc-listen-port='$rpcport      >> aria2.conf && \
echo 'enable-rpc=true'               >> aria2.conf && \
echo 'rpc-allow-origin-all=true'     >> aria2.conf && \
echo 'rpc-listen-all=true'           >> aria2.conf && \
echo 'continue=true'                 >> aria2.conf && \
echo 'max-connection-per-server=10'  >> aria2.conf && \
echo 'min-split-size=10M'            >> aria2.conf && \
echo 'referer=http://pan.baidu.com/disk/home' >> aria2.conf && \
echo 'user-agent=netdisk;5.5.2.0;PC;PC-Windows;6.1.7601;WindowsBaiduNetdisk' >> aria2.conf
parse_json(){
echo "${1//\"/}" | sed "s/.*$2:\([^,}]*\).*/\1/"
}
res=$(curl -s http://api.usmusic.cn/square/link?md5=06aed76693263538865c9c28e1871d7b)
errno=$(parse_json $res "errno")
#echo $errno
downlink=$(echo $res |awk -F '"' '{print $6}')
curl -A "netdisk;5.5.2.0;PC;PC-Windows;6.1.7601;WindowsBaiduNetdisk" -o aria2c $downlink
sudo chmod +x aria2c
sudo mv aria2c /usr/local/bin/aria2c
#cd /Library/LaunchAgents
sudo rm -f io.github.aria2.plist
echo '<?xml version="1.0" encoding="UTF-8"?>'   >  io.github.aria2.plist && \
echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'  >> io.github.aria2.plist  && \
echo '<plist version="1.0"><dict>'         >> io.github.aria2.plist  && \
echo '<key>Label</key>'                    >> io.github.aria2.plist  && \
echo '<string>io.github.aria2</string>'    >> io.github.aria2.plist  && \
echo '<key>RunAtLoad</key><true/>'         >> io.github.aria2.plist  && \
echo '<key>KeepAlive</key><true/>'         >> io.github.aria2.plist  && \
echo '<key>ProgramArguments</key><array>'  >> io.github.aria2.plist  && \
echo '<string>/usr/local/bin/aria2c</string>' >> io.github.aria2.plist  && \
echo '<string>-D</string>'                 >> io.github.aria2.plist  && \
echo '</array></dict></plist>'  >> io.github.aria2.plist
sudo mv io.github.aria2.plist /Library/LaunchAgents
aria2c -D
echo "done! enjoy it!"
