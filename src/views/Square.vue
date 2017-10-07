<template lang="pug">
.square
  el-row(type="flex", v-bind:gutter='50')
    el-col
      el-button-group
        el-button(type="info",size="small", icon="arrow-left", @click='prePage()') 上一页
        el-button(type="info",size="small", @click='nextPage()') 下一页
          i(class='el-icon-arrow-right el-icon--right')
    el-col
      el-input(v-model='searchs',size="small", icon="search", v-bind:on-icon-click='searchplaza',@keyup.enter.native='searchplaza')
    el-col
      span 当前页码:
      el-input-number(v-model='page',size="small", v-bind:min="1")
  el-row(type="flex", v-loading='isLoading')
    el-table(v-bind:data='filelist', empty-text='你来到了空无一人的广场', style='width:100%')
        el-table-column(label='文件名',prop='FileName',show-overflow-tooltip,min-width='200')
        el-table-column(label='-',show-overflow-tooltip,width='100')
          template(scope="scope")
            el-button(type='text', @click='downloadFile(scope.row)') 下载
        el-table-column(label='分享者',prop='From', width='140')
        el-table-column(label='分享留言',prop='Message',show-overflow-tooltip,width='180')
        el-table-column(label='评论数',width='80')
          template(scope='scope')
            el-button(type='text', @click='showComments(scope.row)') {{scope.row.Comments.length}}
        el-table-column(label='分享时间',show-overflow-tooltip,width='160')
          template(scope='scope')
            span {{utils.transeTime(scope.row.Time)}}
  el-row(type="flex", v-bind:gutter='50')
    el-col
      el-button-group
        el-button(type="info",size="small", icon="arrow-left", @click='prePage()') 上一页
        el-button(type="info",size="small", @click='nextPage()') 下一页
          i(class='el-icon-arrow-right el-icon--right')
    el-col
      el-input(v-model='searchs',size="small", icon="search", v-bind:on-icon-click='searchplaza',@keyup.enter.native='searchplaza')
    el-col
      span 当前页码:
      el-input-number(v-model='page',size="small", v-bind:min="1")
  .dialog
    down-dialog(v-model='dialogDL', v-bind:downlinks='downlinks')
    el-dialog(v-model='dialogCm',title='评论区')
      el-table(v-bind:data='comments', empty-text='此文件还没有人评论', height='260')
        el-table-column(label='评论',prop='Message')
        el-table-column(label='评论人',prop='From', width='130')
        el-table-column(label='评论时间')
          template(scope="scope")
            span {{utils.transeTime(scope.row.Time)}}
      el-row
        el-form(v-bind:inline='true')
          el-form-item
            el-input(v-model='mycomment', placeholder="说点什么...")
          el-form-item
            el-button(@click='comment') 评论
</template>

<script>
import {loginmixin} from '@/components/mixins/loginmixin'
import { mapGetters } from 'vuex'
export default {
  name: 'square',
  mixins: [loginmixin],
  data () {
    return {
      number: 15,
      page: 1,
      filelist: [],
      dialogDL: false,
      downlinks: [],
      dialogCm: false,
      commentmd5: '',
      comments: [],
      mycomment: '',
      searchs: ''
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      uk: 'uk'
    })
  },
  methods: {
    getSquareList: function () {
      this.$store.commit('viewloading',true)
      this.$squareAPI.filelist(this.number, this.page - 1)
        .then(list=>{
          this.$store.commit('viewloading', false)
          this.filelist = list
        })
        .catch(e=>{
          this.$store.commit('viewloading', false)
          this.$message.error(e.message)
        })
    },
    searchplaza: function () {
      this.$store.commit('viewloading',true)
      this.$squareAPI.search(this.searchs, 100)
        .then(data=>{
          this.$store.commit('viewloading',false)
          this.filelist = data.items
        })
        .catch(e=>{
          this.$store.commit('viewloading',false)
          this.$message.error(e.message)
        })
    },
    downloadFile: function (file) {
      this.$store.commit('viewloading',true)
      this.$squareAPI.downfiles(file.Md5)
        .then(links=>{
          this.dialogDL = true
          this.$store.commit('viewloading',false)
          this.downlinks = [{
            name: file.FileName,
            urls: links
          }]
        })
        .catch(e=>{
          this.$store.commit('viewloading',false)
          this.$message.error(e.message)
        })
    },
    showComments: function (plaza) {
      this.commentmd5 = plaza.Md5
      this.comments = plaza.Comments
      this.dialogCm = true
    },
    comment: function () {
      this.$confirm('确认要评论这个文件吗？(一旦评论不可更改)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = this.getToken()
        this.$squareAPI.comment(token, this.commentmd5, this.mycomment)
          .then((data)=>{
            this.$message.success(data.message)
            this.getSquareList()
          })
      }).catch((e) => { this.$message.error('评论错误。') })
    },
    prePage: function () {
      this.page = this.page > 1 ? this.page - 1 : 1
    },
    nextPage: function () {
      this.page += 1
    }
  },
  watch: {
    page () {
      this.getSquareList()
    }
  },
  mounted () {
    this.getSquareList()
  }
}
</script>