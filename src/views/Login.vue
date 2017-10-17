<template lang="pug">
.container1
  el-row
    el-col.logo
      span 坐骑WEB
    el-col(type='flex',:sm='{span:10,offset:12}',:md='{span:9,offset:14}',:lg='{span:6,offset:16}')
      el-card.login-container
        el-form(:model='loginForm')
          h3.title 登录坐骑
          el-form-item(prop="account")
            el-input#username(v-model='loginForm.account', placeholder="帐号")
          el-form-item(prop="password")
            el-input#password(type='password',v-model='loginForm.password', placeholder="密码", @change='login')
          el-form-item
            el-checkbox(label='自动登录', v-model="autologin")
          el-form-item.full-width
            el-button.full-width(type='primary', @click='login',:loading='logining')
              | 登录
          el-form-item
            el-button(type='text',@click='register')
              | 没有帐号?注册一个
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      autologin: false
    }
  },
  computed: {
    ...mapGetters({
      logining: 'logining'
    })
  },
  methods: {
    register: function () {
      this.$router.push({path: '/signup'})
    },
    login: function () {
      this.$store.commit('logining',true)
      this.$restAPI.login(this.loginForm.account, this.loginForm.password)
        .then((token)=>{
          if (this.autologin) {
            this.$store.dispatch('autologin',{
              username: this.loginForm.account,
              pwd: this.loginForm.password})
          }
          this.$store.commit('logining',false)
          this.$store.commit('loginsuccess',{token: token})
          const q = this.utils.pathmanager().getQuery()
          const redirect = q.redirect || '/disk'
          this.$router.push({path: redirect})
        })
        .catch((err)=>{
          this.$store.commit('logining',false)
          this.$store.commit('loginfailed',{emsg: err.message || '登录失败'})
          this.$message.error(err.message)
        })
    }
  },
  mounted () {
    let a = localStorage.getItem('autologin')
    if (a) {
      a = JSON.parse(a)
      this.loginForm.account = a.username
      this.loginForm.password = a.pwd
      this.login()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('../styles/loginform.scss');
</style>
