import {
  RECORD_USERINFO,
  GET_USERINFO
} from './mutation-types'
import {setStore} from '../config/utils'

export default {
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('username', info.alias)
  },

  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.name !== info.name)) {
      return
    }

    console.log('GET_USERINFO')
  }
}
