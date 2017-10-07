#!/bin/bash

DEFAULT_BIN_DEST="/usr/local/bin/aria2c"
ARIA2_TEMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t)"
user=`whoami`
userpath=''
downloadpath=''
UA="netdisk;5.5.2.0;PC;PC-Windows;6.1.7601;WindowsBaiduNetdisk"
rpcpass='combo$$c2web'
rpcport='6802'

cleanup_temp_dir() {
  if [ -n "$ARIA2_TEMP_DIR" ];then
    rm -rf "$ARIA2_TEMP_DIR"
    STACK_TEMP_DIR=''
  fi
}

die() {
  echo "$@" >&2
  exit 1
}

# try_issue() {
#   case "$(cat /etc/issue 2>/dev/null)" in
#     "Arch Linux"*)
#       echo "arch;" # n.b. Version is not available in /etc/issue on Arch
#     ;;
#     "Ubuntu"*)
#       echo "ubuntu;$(perl -ne 'if(/Ubuntu (\d+\.\d+)/) { print $1; }' < /etc/issue)"
#     ;;
#     "Debian"*)
#       echo "debian;$(perl -ne 'if(/Debian GNU\/Linux (\d+(\.\d+)?)/) { print $1; }' < /etc/issue)"
#     ;;
#     *"SUSE"*)
#       echo "suse;$(perl -ne 'if(/SUSE\b.* (\d+\.\d+)/) { print $1; }' < /etc/issue)"
#     ;;
#     *"NixOS"*)
#       echo "nixos;$(perl -ne 'if(/NixOS (\d+\.\d+)/) { print $1; }' < /etc/issue)"
#     ;;
#     "CentOS"*)
#       echo "centos;$(perl -ne 'if(/^CentOS release (\d+)\./) { print $1; }' < /etc/issue)"
#     ;;
#     *)
#   esac
# }

genconf() {
  cd $userpath
  mkdir .aria2 && cd .aria2 && rm -rf *
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
  echo 'user-agent='$UA >> aria2.conf
}

linux_launch_start() {
  echo "please add 'aria2c -D' to your /etc/rc.local."
}

macos_launch_start() {
  cd $ARIA2_TEMP_DIR
  sudo rm -f /Library/LaunchAgents/io.github.aria2.plist
  echo '<?xml version="1.0" encoding="UTF-8"?>'   >  io.github.aria2.plist && \
  echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'  >> io.github.aria2.plist  && \
  echo '<plist version="1.0"><dict>'        >> io.github.aria2.plist  && \
  echo '<key>Label</key>'                   >> io.github.aria2.plist  && \
  echo '<string>io.github.aria2</string>'   >> io.github.aria2.plist  && \
  echo '<key>RunAtLoad</key><true/>'        >> io.github.aria2.plist  && \
  echo '<key>KeepAlive</key><true/>'        >> io.github.aria2.plist  && \
  echo '<key>ProgramArguments</key><array>' >> io.github.aria2.plist  && \
  echo '<string>/usr/local/bin/aria2c</string>' >> io.github.aria2.plist  && \
  echo '<string>-D</string>'                >> io.github.aria2.plist  && \
  echo '</array></dict></plist>'  >> io.github.aria2.plist
  sudo mv io.github.aria2.plist /Library/LaunchAgents
}

do_linux_install() {
  echo 'test'
}

do_macos_install() {
  res=$(curl -s http://api.usmusic.cn/square/link?md5=06aed76693263538865c9c28e1871d7b)
  downlink=$(echo $res |awk -F '"' '{print $6}')
  curl -A $UA -o aria2c $downlink
  sudo chmod +x aria2c
  sudo mv aria2c $DEFAULT_BIN_DEST
}

do_linux_ins() {
  if [ $user = "root" ];then
    die "You can't run it on root!"
  else
    userpath='/home/'$user
  fi
  downloadpath=$userpath'/Downloads'
  mkdir $downloadpath
  genconf
  do_linux_install
  linux_launch_start
}

do_macos_ins() {
  userpath='/Users/'$user
  downloadpath=$userpath'/Downloads'
  genconf
  do_macos_install
  macos_launch_start
}

do_os() {
  case `uname` in
    "Linux")
      do_linux_ins
      ;;
    "Darwin")
      do_macos_ins
      ;;
    *)
      die "Sorry, this script does not support your operating system: $(uname)."
  esac
}

cd $ARIA2_TEMP_DIR
do_os
aria2c -D
cleanup_temp_dir
echo "done! enjoy it!"