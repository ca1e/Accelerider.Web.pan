<template  lang="pug">
.about
    div(slot="header")
      h3 关于坐骑网页版
    div 1.本平台基于百度云，部分文件下载可能限速
    div 2.支持发送到aria2下载，请按如下配置：
    ul
      li 如果已有aria2，请配置参数：rpc-secret=combo$$c2web以及rpc-listen-port=6802
      li 如果你还没有aria2：
        ul
          li
            | For macOS用户
            s (包括大部分Linux用户)
            | ，只需要终端执行：
            pre
              code.code curl 'pan.accelerider.com/pan/install.sh' | sh
            | 然后刷新网页
          li For Windows用户：请自求多福吧。
      li 对于Aria2管理，由于尚未集成，目前推荐使用
        a(href='http://ariang.mayswind.net/latest',target='_blank') AriaNg
        | ，请不要忘记设置token。
    div 3.官方QQ群 553683933
    div 4.给作者来杯咖啡钱，饿死了就没人更新了。
    el-row(type="flex")
      el-col
        img(src='../assets/wechat.png',title='请在新窗口打开以查看大图',alt='微信支付',height=300)
        img(src='../assets/alipay.png',title='请在新窗口打开以查看大图',alt='支付宝支付',height=300)
</template>

<style scoped>
.code {
  padding: 0.5em;
  border: solid 1px #e1e4e5;
}
</style>