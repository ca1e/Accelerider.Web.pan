export const loginmixin = {
  name: 'loginmixin',
  data () {
    return {
    }
  },
  methods: {
    getToken: function () {
      return localStorage.getItem('accessToken')
    },
    clearsecret: function () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('autologin')
    }
  }
}
