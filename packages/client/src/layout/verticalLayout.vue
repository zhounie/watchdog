<template>
    <a-layout class="vertical-layout">
      <a-layout-header>
        <Logo :isVertical="true" />
        <div class="menu">
          <Menu mode="horizontal" />
        </div>
        <Logout />
      </a-layout-header>

      <a-layout-content>
        <div class="main-box">
            <router-view></router-view>
        </div>
      </a-layout-content>

      <!-- <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </template>

  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { menu } from '@/config/menu'
  import Logout from './components/Logout.vue'
  import Logo from './components/Logo.vue'
  import Menu from './components/Menu.vue'

  const router = useRouter()

  const onSelectMenu = ({ key }) => {
    router.push(`/${key}`)
  }


  </script>

  <style lang="scss" scoped>
  .vertical-layout {
    background: #001529;
    height: 100vh;
    .main-box {
        height: calc(100vh - 64px - 10px);
        padding: 10px;
        background: #f5f5f5;
        margin: 0 10px 10px;
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .ant-layout-header {
      display: flex;
      align-items: center;
      padding-inline: 0;
      .menu {
        flex: 1;
      }
    }
  }
  // #components-layout-demo-fixed .logo {
  //   width: 120px;
  //   height: 31px;
  //   background: rgba(255, 255, 255, 0.2);
  //   margin: 16px 24px 16px 0;
  //   float: left;
  // }
//   .site-layout .site-layout-background {
//     background: #fff;
//   }
  
//   [data-theme='dark'] .site-layout .site-layout-background {
//     background: #141414;
//   }
  </style>