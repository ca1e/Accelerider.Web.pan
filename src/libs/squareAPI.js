import baseAPI from './base/baseAPI'
import qs from 'qs'

class SquareAPI extends baseAPI {
  constructor () {
    super(process.env.REST_BASE_URL + '/square')
  }
  filelist (number, page) {
    const url = '/list'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { n: number, p: page }
    })
      .then(response => response.data.items)
  }
  search (skey, number) {
    const url = '/search'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { n: number, s: skey }
    })
      .then(response => response.data)
  }
  add2square (token, file, msg) {
    const url = '/add'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({
        md5: file.md5,
        size: file.size,
        filename: file.filename,
        message: msg
      })
    })
      .then(response => response.data.message)
  }
  comment (token, md5, msg) {
    const url = '/comment'
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token, md5: md5 },
      data: qs.stringify({
        comment: msg
      })
    })
      .then(response => response.data)
  }
  downfiles (md5) {
    const url = '/link'
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { md5: md5 }
    })
      .then(response => response.data.links)
  }
}

export default SquareAPI
