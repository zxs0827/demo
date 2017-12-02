<template>
  <div class="login-container">
    <!-- 前景图片 -->
    <section class="foreground-container">
      <div class="foreground-1"></div>
      <div class="foreground-2"></div>
      <div class="foreground-left">
        <div class="code-container">
          <div class="code-left"></div>
        </div>
      </div>
      <div class="foreground-right">
        <div class="code-container">
          <div class="code-right"></div>
        </div>
      </div>
    </section>
    <!-- logo -->
    <section class="logo-container">
      <div class="logo"></div>
    </section>
    <!-- title -->
    <section class="title-container">
      <div class="title">智能监控平台</div>
    </section>
    <!-- login -->
    <section class="pannel-container">
      <div class="login-pannel">
        <!-- 登录表单 -->
        <form class="login-form">
          <section class="input-container">
            <input class="username" type="text" placeholder="请输入用户名" v-model.lazy="username">
          </section>
          <section class="input-container">
            <input class="password" type="password" placeholder="请输入密码" v-model.lazy="password">
          </section>
          <section class="input-container">
            <input class="checkcode" type="text" placeholder="请输入校验码" v-model.lazy="checkcode">
            <div class="img-container">
              <img :src="checkcodeImg">
              <div class="refresh" @click="getCheckcode"></div>
            </div>
          </section>
        </form>
        <div class="login-button" @click="login">登录</div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {login, getCheckcode} from '../../api/api'

  export default {
    data () {
      return {
        username: null, // 用户名
        password: null, // 密码
        checkcode: null, // 验证码
        checkcodeImg: null, // 验证码地址
        userInfo: null // 获取到的用户信息
      }
    },
    created () {
      this.getCheckcode()
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),

      // 获取验证码
      async getCheckcode () {
        let res = await getCheckcode()
        this.checkcodeImg = res.data.code
      },

      // 发送登录
      async login () {
        if (!this.username) {
          return
        } else if (!this.password) {
          return
        } else if (!this.checkcode) {
          return
        }

        // 发送登录
        this.userInfo = await login(this.username, this.password, this.checkcode)

        if (!this.userInfo) {
          console.log('无效的用户信息')
        } else {
          this.RECORD_USERINFO(this.userInfo.data.data)

          this.$router.push({
            path: '/index'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 1920px;
    height: 960px;
    background-image: url("../../assets/login/bk.png");

    .foreground-container {
      width: 1920px;
      height: 960px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .foreground-1{
        width: 1920px;
        height: 960px;
        background-image: url("../../assets/login/earth.png");
        position: absolute;
      }

      .foreground-2{
        width: 1920px;
        height: 960px;
        background-image: url("../../assets/login/background-5.png");
        position: absolute;
      }

      .foreground-left{
        width: 139px;
        height: 332px;
        background-image: url("../../assets/login/2-1.png");
        margin-left: 30px;

        .code-container {
          width: 139px;
          height: 310px;
          margin-top: 11px;
          overflow: hidden;

          .code-left {
            width: 156px;
            height: 560px;
            background-image: url("../../assets/login/4-1.png");
          }
        }
      }

      .foreground-right{
        width: 139px;
        height: 332px;
        background-image: url("../../assets/login/2-2.png");
        margin-right: 30px;

        .code-container {
          width: 139px;
          height: 310px;
          margin-top: 11px;
          overflow: hidden;

          .code-right {
            width: 156px;
            height: 560px;
            background-image: url("../../assets/login/4-2.png");
          }
        }
      }
    }

    .logo-container {
      position: absolute;
      top: 65px;
      left: 100px;

      .logo {
        width: 244px;
        height: 55px;
        background-image: url("../../assets/common/logo.png");
      }
    }

    .title-container {
      position: absolute;
      top: 160px;
      left: 50%;
      margin-left: -114px;

      .title {
        font-size:38px;
        color: #1284c2;
      }
    }

    .pannel-container {
      width: 820px;
      height: 428px;
      background-color: rgba(0, 255, 254, 0.2);
      border-radius: 25px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -214px;
      margin-left: -410px;
      z-index: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:before {
        content: "";
        width: 820px;
        height: 428px;
        background-image: url("../../assets/login/left-line.png");
        position: absolute;
        top: 40px;
        right: 60px;
        z-index: -1;
      }

      &:after {
        content: "";
        width: 816px;
        height: 426px;
        background-image: url("../../assets/login/right-line.png");
        position: absolute;
        bottom: 40px;
        left: 60px;
        z-index: -1;
      }

      .login-pannel {

        .login-form {
          margin-bottom: 30px;

          .input-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            position: relative;

            input {
              font-size: 17px;
              color: #fff;
              line-height: 25px;
              background-color: transparent;
              border: none;
              border-bottom: 2px solid rgb(6, 129, 171);
              padding-left: 35px;
              padding-right: 5px;

              &::placeholder {
                color: rgb(121, 240, 241);
              }
            }

            .username {
              background-image: url("../../assets/login/user.png");
              background-repeat: no-repeat;
              background-size: 6%;
              background-position: left 5px center;
            }

            .password {
              background-image: url("../../assets/login/password.png");
              background-repeat: no-repeat;
              background-size: 6%;
              background-position: left 5px center;
            }

            .checkcode {
              background-image: url("../../assets/login/checkcode.png");
              background-repeat: no-repeat;
              background-size: 6%;
              background-position: left 5px center;
            }

            .img-container {
              width: 100px;
              height: 29px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: absolute;
              left: 156px;

              .refresh {
                width: 20px;
                height: 20px;
                background-image: url("../../assets/login/refresh.png");
                background-size: 100% 100%;
                cursor: pointer;
              }
            }
          }
        }

        .login-button {
          width: 254px;
          height: 30px;
          background-color: rgba(10, 146, 188, 0.8);
          border: 1px solid rgb(6, 129, 171);
          box-shadow: 0px 0px 5px rgba(0,0,0,0.45);
          font-size: 20px;
          color: rgb(121, 240, 241);
          letter-spacing: 10px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
  }
</style>
