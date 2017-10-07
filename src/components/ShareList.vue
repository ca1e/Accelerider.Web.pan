<template lang="pug">
.sharelist(v-loading='isLoading')
  el-row
    el-button(type='text',@click='backFileList',icon='arrow-left') BACK
  el-row.disk-table
    file-list(pre_='share_')
  el-dialog(v-model='parseUrl')
    el-form.sharelist
      el-form-item(label='分享链接')
        el-input#shareurl(v-model='shareurl')
      el-form-item(label='密码(没有就不填)')
        el-input#password(v-model='pwd')
      el-form-item
        el-button(type='primary',@click='getShare') GET
</template>

<script>
export default {
  name: 'sharelist',
  data () {
    return {
      parseUrl: false,
      isLoading: false,
      shareurl: '',
      pwd: '',
      sharetoken: '',
      filescount: 0,
      curPath: []
    }
  },
  methods: {
    backFileList: function () {
      let pathStack = this.curPath
      let cur = '/'
      if (pathStack.length > 1) {
        pathStack.pop()
      }
      cur = pathStack.pop()
      this.getsharelist(cur)
    },
    getsharelist: function (path) {
      this.isLoading = true
      this.$shareAPI.getsharelist(this.sharetoken,path)
        .then(filelist=>{
          this.isLoading = false
          this.curPath.push(path)
          this.filescount = filelist.length
          this.Bus.$emit('share_showfilelist', filelist)
        })
        .catch(msg=>{
          this.isLoading = false
          this.$message.error(msg)
        })
    },
    getShare: function () {
      this.parseUrl = false
      this.isLoading = true
      this.$shareAPI.getshare(this.shareurl,this.pwd)
        .then(token=>{ this.sharetoken = token; this.getsharelist('/') })
        .catch(msg=>{
          this.isLoading = false
          this.$message.error(msg)
        })
    }
  },
  mounted () {
    this.Bus.$on('share_shareurl',data=>{
      this.parseUrl = true
    })
    this.Bus.$on('share_downfiles',files=>{
      this.$message.error('还没有！')
    })
    this.Bus.$on('share_changepath',file=>{
      this.getsharelist(file.path)
    })
  }
}
</script>