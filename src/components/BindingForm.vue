<template lang="pug">
el-form(label='绑定',v-loading='loading')
  el-form-item(label='paste your cookie')
    el-input(v-model='bdcookie', type="textarea", autosize)
  el-form-item
    el-button(type='primary', @click='bindingByCookie') 绑定
  el-form-item
    .cookietip
      span cookie获取方法(仅针对chromium系浏览器)：
      br
      span
        | 1.打开
      a(href='http://pan.baidu.com/',target='_blank') 百度盘
      span
        | 并登录
      br
      span
        | 2.在百度盘页面按F12调出控制台,切换到network,过滤条件选择XHR
      br
      span
        | 3.重新刷新百度盘页面(不要关闭控制台)
      br
      span
        | 4.随便点一个请求,选择Headers标签,复制其中Request Headers下面Cookie的值粘贴于此
      br
      img(src='../assets/cookie.png',title='请在新窗口打开以查看大图',alt='图片说明',height=100)
</template>

<script>
import {loginmixin} from '@/components/mixins/loginmixin'
export default {
  name: 'bindingform',
  mixins: [loginmixin],
  data () {
    return {
      bdcookie: '',
      loading: false
    }
  },
  methods: {
    bindingByCookie: function () {
      this.loading = true
      this.$restAPI.binding(this.getToken(), this.bdcookie)
        .then((errno)=>{ this.loading = false })
        .catch((e)=>{ this.loading = false; this.$message.error(e.msg || e.message) })
    }
  }
}
</script>

<style scoped>
.cookietip{
  color:red;
}
</style>