<template lang="pug">
el-container
  el-header.header
    el-row
      el-col.logo(:span='10')
        //- img(src='static/logo.png')
        span(@click='toggleAside') 坐骑WEB
      el-col.userinfo(:span='4')
        el-button(v-if='!isbind',@click='binding') 尚未绑定百度账号
        el-button(v-if='!isbind',@click='logout') 退出
        el-dropdown(trigger="hover", v-if='isbind')
          span.el-dropdown-link.userinfo-inner
            img(:src='userInfo.avatar_url')
            | {{userInfo.Name}}
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item 用量:{{utils.percentSize(userInfo.used,userInfo.total)}}%
            el-dropdown-item(@click.native='changeUser') 切换帐号
            el-dropdown-item(divided, @click.native='logout') 退出登录
  el-container(:style="clientHeight")
    el-aside(width='1')
      el-menu(:default-active="$route.path", router, :collapse="isCollapse")
        template(v-for="(item,index) in $router.options.routes[2].children")
          el-submenu(:index="index+''", v-if="item.children&&item.children.length>0")
            template(slot="title")
              i(:class="item.iconCls")
              span(slot='title') {{item.name}}
            el-menu-item(v-for="child in item.children", key='child', :index="item.path + '/' + child.path", v-show='!child.hidden')
              i(:class='child.iconCls')
              span(slot='title') {{child.name}}
          el-menu-item(:index="item.path", v-if="!item.children")
            i(:class="item.iconCls")
            span(slot='title') {{item.name}}
      el-row
        //- el-progress(type="circle", :percentage="utils.percentSize(userInfo.used,userInfo.total)")
    el-main
      transition
        router-view
  el-dialog(:visible.sync='bindDlg')
    bind-form
  el-dialog(:visible.sync='ukDlg')
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
      isCollapse: false,
      clientHeight: 'height: 300px',
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
    toggleAside: function () {
      this.isCollapse = !this.isCollapse
    },
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
    this.clientHeight = `height: ${document.documentElement.clientHeight - 65}px`
    const that = this
    window.onresize = function temp () {
      that.clientHeight = `height: ${document.documentElement.clientHeight - 65}px`
    }
    this.getUserList()
  }
}
</script>

<style scoped lang="scss">
$color-primary: #20a0ff;//#18c79c
.header{
  line-height: 60px;
  background: $color-primary;
  color:#fff;
}
.logo{
  color: #fff;
  font-size: 22px;
  padding-left:20px;
  padding-right:20px;
  width:25%;
  cursor: pointer;
}
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
</style>