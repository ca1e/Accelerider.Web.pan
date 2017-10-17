import baseAPI from './base/baseAPI'

class ShareAPI {
  constructor () {
    super(process.env.REST_BASE_URL)
  }
  getsharetoken (shareUrl, password) {
    const url = '/sharefiles'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { 'shareurl': shareUrl, 'pass': password }
    })
      .then(response => response.data.token)
  }
  getsharelist (token, path) {
    const url = '/sharefiles'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        'token': token,
        'path': path
      }
    })
      .then(response => response.data)
      .then(data => {
        if (data.errno !== 0) { throw new Error(data.message) }
        return data.list
      })
  }
  downsharelinks (token, files) {
    const url = '/sharelinks'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) { ret += `${it}=${encodeURIComponent(data[it])}&` }
        return ret
      }],
      data: { 'filelist': JSON.stringify(files) }
    })
      .then(response => response.data)
  }
}

export default ShareAPI