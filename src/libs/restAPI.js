import axios from 'axios'
import qs from 'qs'
import MD5 from './cryptos'

class RestAPI {
  constructor () {
    this.$ajax = axios.create({
      baseURL: process.env.REST_BASE_URL,
      headers: {}
    })
    this.$ajax.interceptors.response.use(
      (config) => { return config },
      (err) => {
        let msg = ''
        if (err.response) { msg = err.response.data.message } else { msg = err.message }
        throw new Error(msg)
      }
    )
  }
  signup (username, password) {
    const url = '/signup'
    let data = { name: username, password: MD5(password).toString() }
    /* eslint-disable no-undef */
    try { data.code = code } catch (e) {}
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { security: 'md5' },
      data: qs.stringify(data)
    })
      .then(response => response.data)
      .then(data => data.message)
  }
  getcookies (token, uk) {
    const url = '/getCookies'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { token: token, uk: uk }
    })
      .then(response => response.data)
  }
  vertifyco (cookies, json) {
    const url = 'https://localhost/api/checo'
    let cookie = cookies
    if (json) {
      cookie = ''
      let c = JSON.parse(cookies)
      for (let it in c) { cookie += `${it}=${c[it]};` }
    }
    return this.$ajax({
      method: 'POST',
      url: url,
      data: { cookie: cookie }
    })
      .then(response => response.data).catch(e => {})
  }
  binding (token, cookies) {
    const url = '/binding'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({ cookies: cookies })
    })
      .then(response => response.data)
      .then(data => {
        if (data.errno !== 0) { throw new Error(data.message) }
        return data.errno
      })
  }
  login (username, password) {
    const url = '/login'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { security: 'md5' },
      data: qs.stringify({
        name: username,
        password: MD5(password).toString(),
        clienttype: process.env.CLIENT_TYPE
      })
    })
      .then(response => response.data)
      .then(data => {
        if (data.errno !== 0) { throw new Error(data.message) }
        return data.token
      })
  }
  _userinfo (token, uk) {
    const url = '/userinfo'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { token: token, uk: uk }
    })
      .then(data => {
        data = data.data
        let info = {}
        info.uk = uk
        info.Name = data.username
        info.avatar_url = data.avatar_url
        info.nick_name = data.nick_name
        info.total = data.total
        info.free = data.free
        info.used = data.used
        return info
      })
  }
  userlist (token) {
    const url = '/userlist'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { token: token }
    })
      .then(response => response.data)
      .then(data => {
        data.userlist.map(item => {
          // this.getcookies(token, item.Uk)
          //   .then(response => response.cookiesString)
          //   .then(data => { this.vertifyco(data, true) })
          item.Name = unescape(item.Name.replace(/\\u/g, '%u'))
          item.Token = token
        })
        return data.userlist
      })
      .then(list => list.map(item => this._userinfo(token, item.Uk)))
      .catch(err => {
        let msg = ''
        if (err.response) { msg = err.response.data.message } else { msg = err.message }
        throw msg
      })
  }
  filelist (token, uk, path) {
    const url = '/filelist'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        uk: uk,
        path: path
      }
    })
      .then(response => response.data.list)
      .then(list => list.map(i => {
        i.filename = i.server_filename
        return i
      }))
  }
  createFolder (token, uk, path) {
    const url = '/cFolder'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        uk: uk,
        path: path
      }
    })
      .then(response => response.data)
  }
  deletefile (token, uk, path) {
    const url = '/deleteFile'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        uk: uk,
        path: path
      }
    })
      .then(response => response.data)
  }
  downfiles (token, uk, files) {
    const url = '/filelinks'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        uk: uk
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) { ret += `${it}=${encodeURIComponent(data[it])}&` }
        return ret
      }],
      data: { 'files': JSON.stringify(files) }
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
  zqdownfiles (files) {
    const url = 'http://127.0.0.1:10000/guanjia'
    let data = {
      'filelist': [{ 'server_path': files.path }]
    }
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        method: 'DownloadSelfOwnItems'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) { ret += `${it}=${encodeURIComponent(data[it])}&` }
        return ret
      }],
      data: { 'filelist': JSON.stringify(data) }
    })
      .then(response => response.data)
  }
}

export default RestAPI