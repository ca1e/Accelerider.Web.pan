import axios from 'axios'

class BaseAPI {
  constructor (baseUrl) {
    this.$ajax = axios.create({
      baseURL: baseUrl,
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
}

export default BaseAPI