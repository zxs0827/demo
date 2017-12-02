<template>
  <div class="app-container">
    <!-- menu -->
    <section class="menu-container">
      <!-- 一级菜单 -->
      <div class="parent-container">
        <ul>
          <li :class="'parent-item-font' + item.name.length" v-for="(item, index) in parList" :key="index" @click="chooseParentMenu(index)" >{{item.name}}</li>
        </ul>
      </div>
      <!-- 二级菜单 -->
      <div class="child-container">
        <ul>
          <li class="child-item" :class="{'child-active-item': index === childIndex}" v-for="(item, index) in subList" :key="index" @click="chooseChildMenu(index)">{{item.name}}</li>
        </ul>
      </div>
      <!-- icon -->
      <div class="icon-container">
        <div class="icon"></div>
      </div>
    </section>
    <!-- logo -->
    <section class="logo-container">
      <div class="logo"></div>
    </section>
    <!-- user -->
    <section class="user-container">
      <div class="user"><span class="user-span">{{username}}</span></div>
      <div class="btn-container">
        <div class="set"></div>
        <div class="reback"></div>
        <div class="close"></div>
        <div class="edit"></div>
      </div>
    </section>
    <!-- datetime -->
    <section class="datetime-container">
      <div class="datetime">{{datetime}}</div>
    </section>
    <!-- 二级页面 -->
    <section class="subpage-container">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import {getMenu} from './api/api'
  import {getStore} from './config/utils'

  export default {
    data () {
      return {
        parList: null, // 一级菜单
        subList: null, // 二级菜单
        parentIndex: 0, // 一级菜单索引
        childIndex: 0, // 二级菜单索引
        username: null, // 用户名
        datetime: null, // 日期
        parentCss: null, // 一级菜单样式类
        parentActiveCss: null // 一级菜单选中样式类
      }
    },
    created () {
      this.getMenu()
      this.getUser()
      this.updateDateTime()
    },
    mounted () {
      setInterval(this.updateDateTime, 1000)
    },
    methods: {
      // 更新日期
      updateDateTime () {
        let dateTime = new Date()

        this.datetime = this.zeroPadding(dateTime.getFullYear(), 4) + '-' +
          this.zeroPadding(dateTime.getMonth() + 1, 2) + '-' +
          this.zeroPadding(dateTime.getDate(), 2) + ' ' +
          this.zeroPadding(dateTime.getHours(), 2) + ':' +
          this.zeroPadding(dateTime.getMinutes(), 2) + ':' +
          this.zeroPadding(dateTime.getSeconds(), 2)
      },

      // 补0占位
      zeroPadding (num, digit) {
        let zero = ''

        for (let i = 0; i < digit; i++) {
          zero += '0'
        }

        return (zero + num).slice(-digit)
      },

      // 获取用户
      getUser () {
        this.username = getStore('username')
      },

      // 获取菜单
      async getMenu () {
        let res = await getMenu()

        if (res.data.code === 0) {
          this.parList = res.data.data
        } else {
          console.log('获取菜单失败')
        }
      },

      // 选择一级菜单, 添加样式
      chooseParentMenu (index) {
        this.parentIndex = index
        this.subList = this.parList[index].sublist
      },

      // 选择二级菜单
      chooseChildMenu (index) {
        this.childIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    width: 1280px;
    height: 720px;
    background-image: url("./assets/index/bk-2.png");

    .menu-container {
      width: 999px;
      height: 526px;
      background-image: url("./assets/index/header-bk.png");
      position: relative;

      .parent-container {
        width: 790px;
        position: absolute;
        left: 195px;
        overflow: hidden;

        ul {
          width: 300px;
          height: 41px;
          list-style: none;
          display: flex;

          li {
            height: 41px;
            text-align: center;
            line-height: 41px;
            color: #fff;
            white-space: nowrap;
            flex-shrink: 0;
            margin-left: 5px;
            cursor: pointer;
          }

          .parent-item-font2 {
            width: 89px;
            height: 41px;
            background-image: url("./assets/index/btn-2.png");
          }

          .parent-item-active-font2 {
            width: 89px;
            height: 42px;
            background-image: url("./assets/index/btn-active2.png");
          }

          .parent-item-font4 {
            width: 100px;
            height: 41px;
            background-image: url("./assets/index/btn-4.png");
          }

          .parent-item-active-font4 {
            width: 100px;
            height: 42px;
            background-image: url("./assets/index/btn-active4.png");
          }

          .parent-item-font6 {
            width: 119px;
            height: 41px;
            background-image: url("./assets/index/btn-6.png");
          }

          .parent-item-active-font6 {
            width: 119px;
            height: 42px;
            background-image: url("./assets/index/btn-active6.png");
          }

          .parent-item-font8 {
            width: 151px;
            height: 43px;
            background-image: url("./assets/index/btn-8.png");
          }

          .parent-item-active-font8 {
            width: 151px;
            height: 43px;
            background-image: url("./assets/index/btn-active8.png");
          }
        }
      }

      .child-container {
        width: 241px;
        position: absolute;
        top: 152px;
        left: -10px;

        ul {
          list-style: none;

          li {
            text-align: left;
            line-height: 51px;
            color: #fff;
            padding-left: 50px;
            margin-bottom: 29px;
            cursor: pointer;
          }

          .child-item {
            width: 191px;
            height: 51px;
            background-image: url("./assets/index/sidebar-normal.png");
            background-repeat: no-repeat;
          }

          .child-active-item {
            width: 191px;
            height: 51px;
            background-image: url("./assets/index/sidebar-active.png");
            background-repeat: no-repeat;
          }
        }
      }

      .icon-container {
        position: absolute;
        top: 116px;
        left: 32px;

        .icon {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/fold-btn.png");
        }
      }
    }

    .logo-container {
      position: absolute;
      top: 40px;
      left: 16px;

      .logo {
        width: 244px;
        height: 55px;
        background-image: url("./assets/common/logo.png");
        background-repeat: no-repeat;
        background-size: 80%;
      }
    }

    .user-container {
      position: absolute;
      top: 13px;
      left: 1030px;
      z-index: 1;

      .user {
        width: 243px;
        height: 104px;
        background-image: url("./assets/index/user-bk.png");
        position: relative;

        .user-span {
          width: 183px;
          height: 53px;
          font-size: 30px;
          color: #fff;
          text-align: center;
          line-height: 53px;
          position: absolute;
          top: 11px;
          left: 51px;
        }
      }

      .btn-container {
        width: 130px;
        display: flex;
        justify-content: space-between;
        margin-top: -10px;
        margin-left: 30px;
        cursor: pointer;

        .set {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-set.png");
        }

        .set-active {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-set-active.png");
        }

        .reback {
          width: 31px;
          height: 30px;
          background-image: url("./assets/index/h-reback.png");
        }

        .reback-active {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-reback-active.png");
        }

        .close {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-close.png");
        }

        .close-active {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-close-active.png");
        }

        .edit {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-edit.png");
        }

        .edit-active {
          width: 30px;
          height: 30px;
          background-image: url("./assets/index/h-edit-active.png");
        }
      }
    }

    .datetime-container {
      position: absolute;
      top: 80px;
      left: 245px;

      .datetime {
        font-size: 20px;
        color: #fff;
      }
    }

    .subpage-container {
      width: 1020px;
      height: 559px;
      background-image: url("./assets/index/main-data.png");
      position: absolute;
      top: 115px;
      left: 260px;
      z-index: 0;
    }
  }
</style>
