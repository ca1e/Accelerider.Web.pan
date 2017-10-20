import baseAPI from './base/baseAPI'
import qs from 'qs'

class M4sAPI extends baseAPI {
  constructor () {
    super(process.env.REST_BASE_URL + '/cloud')
  }
  filelist (token, path) {
    const url = '/filelist'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data.list)
      .then(list => list.map(i => {
        i.filename = i.fileName
        i.isdir = i.dir
        return i
      }))
  }
  createuploadtask (token, path, md5, size) {
    const url = '/upload/v2/create'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        path: path
      },
      data: qs.stringify({
        md5: md5,
        size: size
      })
    })
      .then(response => response.data)
  }
  confirmuploadtask (token, id) {
    const url = '/upload/v2/confirm'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        uploadId: id
      }
    })
      .then(response => response.data)
  }
  flashupload (token, path, md5, size) {
    const url = '/upload/v2/repid'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        path: path
      },
      data: qs.stringify({
        md5: md5,
        size: size
      })
    })
      .then(response => response.data)
      .then(data => {
        if (data.errno !== 0) { throw new Error(data.message) }
        return data.errno
      })
  }
  upload2m4s (token, path, md5, size) {
    const url = '/upload'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        path: path
      },
      data: qs.stringify({
        totalMd5: md5,
        silceMd5: md5,
        size: size
      })
    })
      .then(response => response.data)
  }
  createFolder (token, path) {
    const url = '/cFolder'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data)
  }
  copyFile (token, from, to) {
    const url = '/copy'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({
        from: from,
        to: to
      })
    })
      .then(response => response.data)
  }
  deletefile (token, path) {
    const url = '/delete'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data)
  }
  downfiles (token, path) {
    const url = '/filelink'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data)
      .then(data => {
        if (data.links) {
          return data.links
        } else {
          throw new Error(data.message)
        }
      })
  }
  share (token, paths, pass) {
    const url = '/share'
    const data = {
      files: JSON.stringify(paths)
    }
    if (pass !== '') {
      data.pass = pass
    }
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) { ret += `${it}=${encodeURIComponent(data[it])}&` }
        return ret
      }],
      data: data
    })
      .then(response => response.data)
  }
  offlinelist (token) {
    const url = '/offline/list'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { token: token }
    })
      .then(response => response.data)
  }
  createoffline (token, link) {
    const url = '/offline/create'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({
        link: link
      })
    })
      .then(response => response.data)
  }
}

export default M4sAPI