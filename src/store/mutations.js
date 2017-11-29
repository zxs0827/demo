import {
  RECORD_USERINFO,
  GET_USERINFO
} from './mutation-types'

export default {
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
  },

  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.name !== info.name)) {
      return
    }

    console.log('GET_USERINFO')
  }
}
