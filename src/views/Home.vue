<template lang="pug">
el-row.container
  el-col.header(v-bind:span='24')
    el-col.logo(v-bind:span='10')
      //- img(src='static/logo.png')
      span 坐骑WEB
    el-col.userinfo(v-bind:span='4')
      el-button(v-if='!isbind',@click='binding') 尚未绑定百度账号
      el-dropdown(trigger="hover", v-if='isbind')
        span.el-dropdown-link.userinfo-inner
          img(v-bind:src='userInfo.avatar_url')
          | {{userInfo.Name}}
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item 用量:{{utils.percentSize(userInfo.used,userInfo.total)}}%
          el-dropdown-item(@click.native='changeUser') 切换帐号
          el-dropdown-item(divided, @click.native='logout') 退出登录
  el-col.main
    aside
      el-menu(v-bind:default-active="$route.path", router)
        template(v-for="(item,index) in $router.options.routes[2].children")
          el-submenu(v-bind:index="index+''", v-if="item.children&&item.children.length>0")
            template(slot="title")
              i(v-bind:class="item.iconCls")
              | {{item.name}}
            el-menu-item(v-for="child in item.children", key='child', v-bind:index="item.path + '/' + child.path", v-show='!child.hidden')
              i(v-bind:class='child.iconCls')
              | {{child.name}}
          el-menu-item(v-bind:index="item.path", v-if="!item.children")
            i(v-bind:class="item.iconCls")
            | {{item.name}}
      el-row
        el-progress(type="circle", v-bind:percentage="utils.percentSize(userInfo.used,userInfo.total)")
    section.content-container
      .content-wrapper(type='flex', v-bind:span='24')
        el-card
          transition
            router-view
  el-dialog(v-model='bindDlg')
    bind-form
  el-dialog(v-model='ukDlg')
    user-info
    el-button(type='text',@click='binding') 新增绑定
</template>

<script>
import {loginmixin} from '@/components/mixins/loginmixin'
import { mapGetters } from 'vuex'
export default {
  name: 'disk',
  mixins: [loginmixin],
  data () {
    return {
      isbind: false,
      bindDlg: false,
      ukDlg: false
    }
  },
  computed: {
    ...mapGetters({
      uk: 'uk',
      userInfo: 'userInfo'
    })
  },
  methods: {
    binding: function () {
      this.bindDlg = true
    },
    changeUser: function () {
      this.ukDlg = true
    },
    m4s: function () {
      this.$router.push({path: '/disk/m4s'})
    },
    disk: function () {
      this.$router.push({path: '/disk/home'})
    },
    getUserList: function () {
      const token = this.getToken()
      this.$restAPI.userlist(token)
        .then(reps=>{
          this.isbind = reps.length > 0
          if (this.isbind) {
            reps[0].then(data => { this.$store.dispatch('BDuser',data.uk) })
          }
        })
        .catch((e)=>{
          this.clearsecret()
          this.$router.push({path: '/login'})
        })
    },
    getUserInfo: function () {
      this.ukDlg = false
      const token = this.getToken()
      this.$restAPI._userinfo(token,this.uk)
        .then(info=>{
          this.$store.dispatch('BDuserInfo',info)
        })
    },
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.clearsecret()
        this.$router.push({path: '/login'})
      }).catch(() => {
      })
    }
  },
  watch: {
    uk () {
      this.getUserInfo()
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>

<style scoped lang="scss">
$color-primary: #20a0ff;//#18c79c

.container{
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header{
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color:#fff;
    .userinfo {
        text-align: right;
        padding-right: 3%;
        float: right;
        .userinfo-inner {
            cursor: pointer;
            color: #fff;
            img {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin: 10px 0px 10px 10px;
                float: right;
            }
        }
    }
    .logo{
      height:60px;
      color: #fff;
      font-size: 22px;
      padding-left:20px;
      padding-right:20px;
      width:25%;
    }
  }
  .main{
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    aside {
        width: 15%;
        min-width: 180px;
        overflow: hidden;
    }
    .content-container{
      flex:1;
      overflow-y: scroll;
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>