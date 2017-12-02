// 懒加载
const App = r => require.ensure([], () => r(require('@/App')), 'App')
const login = r => require.ensure([], () => r(require('@/views/login/login')), 'login')
const index = r => require.ensure([], () => r(require('@/views/index/index')), 'index')

export default [{ // 登录页
  path: '/login',
  component: login
},
{ // 顶层路由，对应index.html
  path: '/',
  component: App,
  meta: {requiresAuth: true}, // 是否登录
  children: [ // 二级路由，对应App.vue
    { // 首页
      path: '/index',
      component: index
    }
  ]
}]
