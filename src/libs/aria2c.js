import axios from 'axios'
// import qs from 'qs'

const ID = 'combo$$accelerider.client#web'
const TOKEN = 'combo$$c2web'

class Aria2API {
  constructor () {
    this.$ajax = axios.create({
      baseURL: 'http://localhost:6802/jsonrpc',
      headers: {}
    })
    this.$ajax.interceptors.response.use(
      (config) => { return config },
      (err) => {
        throw new Error(err)
      }
    )
  }
  getVersion () {
    return this._rpc('getVersion',[])
      .then(result=>result.version)
  }
  getGlobalStat () {
    return this._rpc('getGlobalStat',[])
      .then(result=>{ console.log(result) })
  }
  tellActive () {
    return this._rpc('tellActive')
  }
  addUri (uri, name) {
    return this._rpc('addUri',[[uri], { out: name }])
  }
  _rpc (method, params) {
    params.unshift(`token:${TOKEN}`)
    return this.$ajax({
      method: 'POST',
      params: {
        tm: new Date().getTime()
      },
      data: {
        id: ID,
        jsonrpc: '2.0',
        method: `aria2.${method}`,
        params: params
      }
    })
      .then(response => response.data)
      .then(data=>{
        if (data.id === 'combo$$accelerider.client#web') {
          return data.result
        } else { throw new Error('err') }
      })
  }
}

export default Aria2API
