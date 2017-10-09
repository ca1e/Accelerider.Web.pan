import axios from 'axios'

class ShareAPI {
  constructor () {
    this.$ajax = axios.create({
      baseURL: process.env.REST_BASE_URL,
      headers: {}
    })
  }
  getsharetoken (shareUrl, password) {
    const url = '/sharefiles'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { 'shareurl': shareUrl, 'pass': password }
    })
      .then(response => response.data.token)
      .catch(err => {
        let msg = ''
        if (err.response) { msg = err.response.data.message } else { msg = err.message }
        throw msg
      })
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
      .catch(err => {
        let msg = ''
        if (err.response) { msg = err.response.data.message } else { msg = err.message }
        throw msg
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