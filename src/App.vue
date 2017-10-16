<template lang="pug">
#app
  transition
    router-view
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      version: '2.1.3'
    }
  },
  computed: {},
  methods: {
    testFunc: function () {}
  },
  beforeCreate () {},// 组件实例化之前
  created () {},// 组件实例化了
  beforeMount () {},// 组件写入dom结构之前
  mounted () { // 组件写入dom结构了
    console.log(`VERSION:${this.version}`)
  },
  beforeUpdate () {},// 组件更新前
  updated () {},// 组件更新比如修改了文案
  beforeDestroy () {},// 组件销毁之前
  destroyed () {}// 组件已经销毁
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  overflow-y: hidden;
}
.logo{
  height:60px;
  color: #505458;
  font-size: 22px;
  padding-left:20px;
  padding-right:20px;
}
::-webkit-scrollbar {
  width: 12px;
  height: 10px;
}
::-webkit-scrollbar-button{
  display: none;
}
::-webkit-scrollbar-thumb {
  height: 30px;
  background-color: #999;
  -webkit-border-radius: 7px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 3px;
}
#app{
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
	top: 0px;
	bottom: 0px;
  width: 100%;
}
</style>
