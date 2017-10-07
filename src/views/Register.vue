<template lang="pug">
.container1
  el-row
    el-col.logo
      span 坐骑WEB
    el-col(type='flex',v-bind:sm='{span:10,offset:12}',v-bind:md='{span:9,offset:14}',v-bind:lg='{span:6,offset:16}')
      el-card.login-container
        el-form(v-bind:model='signupForm')
          h3.title 注册坐骑
          el-form-item(prop="account")
            el-input#username(v-model='signupForm.account', placeholder="帐号")
          el-form-item(prop="password")
            el-input#password(type='password',v-model='signupForm.password', placeholder="密码")
          el-form-item.full-width
            el-button.full-width(type='primary', @click='register', v-bind:loading='regLoading')
              | 注册帐号
          el-form-item
            el-button(type='text',@click='login')
              | 已有帐号?去登陆
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      regLoading: false,
      signupForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      this.$router.push({path: '/login'})
    },
    register: function () {
      this.regLoading = true
      this.$restAPI.signup(this.signupForm.account, this.signupForm.password)
        .then((rlt)=>{
          this.regLoading = false
          this.$message(rlt)
          this.$router.push({path: '/login'})
        })
        .catch((err)=>{
          this.regLoading = false
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('../styles/loginform.scss');
</style>