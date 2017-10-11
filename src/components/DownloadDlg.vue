<template lang="pug">
.dialog(v-bind:value='value')
  el-dialog(v-bind:visible.sync='showDlg',title='下载链接')
    div(v-for='item in downlinks',key = 'item')
      p {{item.name}}
      ol
        li(v-for='url in item.urls',key = 'url')
          a(v-bind:href='url',target='_blank',rel="noreferrer") 链接
          el-button(type='text', @click='downwitharia2(url, item.name)') aria2下载
</template>

<script>
export default {
  name: 'downloaddlg',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    downlinks: {
      default: []
    }
  },
  data () {
    return {
      showDlg: false,
      isaria2: false
    }
  },
  methods: {
    downwitharia2: function (url, name) {
      this.$Aria2API.addUri(url, name)
        .then(result=>this.$message.success('下载成功!'))
        .catch(e=>this.$message.error('下载失败!请参照关于中的说明确认aria2配置是否正确。'))
    }
  },
  watch: {
    value (val) {
      this.showDlg = val
      this.$Aria2API.getVersion()
        .then(version=>{
          this.isaria2 = true
        })
    },
    showDlg (val) {
      this.$emit('input', val)
    }
  },
  mounted () {
    if (this.value) {
      this.showDlg = true
    }
    this.$Aria2API.getVersion()
      .then(version=>{
        this.isaria2 = true
      })
  }
}
</script>

<style scoped>
a {
  margin: 10px;
}
</style>