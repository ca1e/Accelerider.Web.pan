import { mapGetters } from 'vuex'

export const diskmixin = {
  name: 'diskmixin',
  data () {
    return {
      token: '',
      dialogDL: false,
      downlinks: [],
      selectedFiles: []
    }
  },
  computed: {
    ...mapGetters({
      uk: 'uk',
      isLoading: 'isLoading',
      filelist: 'filelist',
      m4sfilelist: 'm4sfilelist'
    })
  },
  methods: {
    changefilepath: function (file) {
      if (file.isdir === 0) return
      this.$router.push({query: {path: file.path}})
    },
    backFileList: function () {
      const cur = this.utils.pathmanager().getBackPath()
      this.$router.push({query: {path: cur}})
    },
    createFolder: function () {
      this.$prompt('默认新建在当前目录，请输入文件夹名称：', '新建文件夹', {
        inputValue: '新建文件夹',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.createfolderapi(value)
      }).catch(_ => {})
    },
    deleteFiles: function () {
      this.$confirm(`确认删除所有选中的文件(夹)吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('viewloading', true)
        /* eslint-disable no-return-await */
        Promise.all(this.selectedFiles.map(
          o => this.deleteFilesapi(o))
          .map(async o=>await o.then(r=>r.errno))
        ).then(a=>a.reduce((a,b)=>a + b))
          .then(r=>{ if (r !== 0) throw new Error('err') })
          .then(data => {
            this.$store.commit('viewloading', false)
            this.$message.success('全部删除成功!')
            this.goFileList()
          })
          .catch((e)=>{
            this.$store.commit('viewloading', false)
            this.$message.error('删除失败。')
          })
      }).catch(() => {})
    },
    deleteFilesapi: function () {},
    createfolderapi: function () {},
    deleteFile: function (file) {
      this.$confirm(`确认删除文件(夹)'${file.filename}'吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        this.deleteFileapi(file.path)
      }).catch(_ => {})
    },
    add2plaza: function (api, f) {
      this.$prompt('请输入留言', '添加到文件广场', {
        inputValue: '无',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        api.add2square(this.token, f, value)
          .then(msg => {
            this.$message.success(msg)
          })
          .catch(e => this.$message.error(e.message))
      }).catch(_ => {})
    },
    _fileTypeUri: function (file) {
      let filetype = 'folder'
      if (file.isdir === 0) {
        const avalibleType = this.utils.getAvalibleType()
        const type = this.utils.fileType(file.filename)
        for (const t in avalibleType) {
          if (t === 'other') {
            filetype = this.utils.ArrContains(avalibleType[t], type) ? type : 'default'
            break
          }
          if (this.utils.ArrContains(avalibleType[t], type)) {
            filetype = t
            break
          }
        }
      }
      return `./static/icons/${filetype}.png`
    },
    doNothing: function () {
      this.$message.info('开发中...欢迎提出改进建议~')
    }
  }
}
