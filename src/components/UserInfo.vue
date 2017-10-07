<template lang="pug">
.user-info
  el-table(v-bind:data='userInfos',border)
    el-table-column(prop='Name',label='昵称')
    el-table-column(label='用量(已用/总量)')
      template(scope="scope")
        | {{utils.transeSize(scope.row.used)}}/{{utils.transeSize(scope.row.total)}}
    el-table-column(label='操作')
      template(scope="scope")
        el-button.operation-menu(@click="gotoDisk(scope.row.uk)",v-bind:loading='infoLoading')
          | 切换
</template>

<script>
import {loginmixin} from '@/components/mixins/loginmixin'
export default {
  name: 'userinfo',
  mixins: [loginmixin],
  data () {
    return {
      userInfos: [],
      infoLoading: true
    }
  },
  methods: {
    gotoDisk: function (uk) {
      this.$store.dispatch('BDuser', uk)
    },
    getUserList: function () {
      this.userInfos = []
      const token = this.getToken()
      this.$restAPI.userlist(token)
        .then(reps=>{
          this.infoLoading = false
          for (let i in reps)reps[i].then(data => this.userInfos.push(data))
        })
        .catch((err)=>{
          this.infoLoading = false
          this.$message.error(err)
        })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>