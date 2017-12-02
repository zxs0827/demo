import axios from 'axios'

/**
 * 登录
 */
export const login = (username, password, checkcode) => axios('src/api/data/loginState.json', {username, password, checkcode}, 'get')

/**
 * 获取验证码
 */
export const getCheckcode = () => axios('src/api/data/checkcode.json', {}, 'get')

/**
 * 获取菜单
 */
export const getMenu = () => axios('src/api/data/getMenu.json', {}, 'get')
