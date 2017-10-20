/* eslint-disable */
import PM from './pathmanager'
import SparkMD5 from 'spark-md5'

class Utils{
  check_login () {
    return !localStorage.getItem('accessToken')
  }

  downloadFromFrame (url) {
    let ifram = document.getElementById('helperdownloadiframe')
    ifram.setAttribute('src', url)
  }

  calculateMD5 (file) {
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5()
      const blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice
      const chunkSize = 2097152// read in chunks of 2MB
      const chunks = Math.ceil(file.size / chunkSize)
      let currentChunk = 0
      const fr = new FileReader()
      fr.onload = (e) => {
        spark.appendBinary(e.target.result)
        currentChunk++;
        if (currentChunk < chunks) { loadNext() }
        else { resolve({
          size: file.size,
          md5: spark.end()
        })}
        reject('can not calculate md5!')
      }
      const loadNext = () => {
        const start = currentChunk * chunkSize
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fr.readAsBinaryString(blobSlice.call(file, start, end))
      }
      loadNext()
    })
  }

  percentSize (a, b) { return Number(((a/b)*100).toFixed(2)) }

  trans1024 (num, unit) {
    const k = 1024
    const i = Math.floor(Math.log(num) / Math.log(k))
    return `${(num / Math.pow(k, i)).toFixed(2)} ${unit[i]}`
  }

  transeSize (size) {
    if (size===0) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    return this.trans1024(size, sizes)
  }

  transeSpeed (speed) {
    if (speed===0) return '0 B/s'
    const speeds = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
    const rspeed = this.trans1024(speed, speeds)
    return rspeed + '/s'
  }

  ArrContains (arr, obj) {
    let i = arr.length
    while (i--) {
      if (arr[i] === obj) {
        return true
      }
    }
    return false
  }

  getAvalibleType () {
    return {
      code: ['asax','ascx','ashx','asm','asmx','aspx','c','cmd','cpp','cs','css','e','g','h','js','lua','pl'],
      doc: ['doc','docx','ppt','pptx','xls','xlsx'],
      picture: ['bmp','jpg','gif'],
      music: ['mp3'],
      video: ['flv','mkv','mp4','rmvb','wmv'],
      zip: ['7z','gz','gzip','rar','tar','xar','xz','zip','z'],
      other: ['3ds','accdb','ai','air','apk','arj','as','asax','ascx','ashx','asm','asmx','aspx','bin','bmp','bz2','cab','cdr','cer','chm','class','cmd','code','code2','computer','cshtml','csproj','csv','dll','dmg','docm','dot','dotm','dotx','dtd','dwg','dxf','eps','epub','exe','f','fla','folder_mac2','folder_public','fon','font','framework','hlp','html','indd','ini','ipa','iso','jar','java','json','key','ldf','lnk','makefile','md','mdb','mdf','mht','midi','movie','mp4','mpp','mpt','msg','msi','music','music1','numbers','o','odp','ods','odt','oexe','ogg','pages','pdb','pdf','php','pkg','pl','png','pps','ppsx','prproj','ps1','psd','pspimage','pst','pub','py','rar','rb','recycle','recycle_full','reg','resx','rtf','s','sitx','sln','sql','suo','svg','swf','swift','tar','txt',,'utorrent','vb','vbproj','vbs','vcf','vcproj','vcxproj','vdw','vdx','vsd','vsdx','vss','vst','vsx','vtx','xaml','xap','xlsb','xlsm','xlt','xltx','xml','xps','xsd','xsl','y','zip']
    }
  }

  fileType (filename) {
    const index1 = filename.lastIndexOf('.')
    const postf = filename.substring(index1 + 1, filename.length)
    return postf.toLowerCase()
  }

  transeTime (mtime) {
    const newDate = new Date(mtime * 1000)
    Date.prototype.Format = function (fmt) {
      let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      return fmt
    }
    return newDate.Format('yyyy-MM-dd hh:mm')
  }

  pathmanager () { return new PM() }
}

export default Utils