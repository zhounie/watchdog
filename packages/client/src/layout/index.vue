<template>
    <a-layout class="layout-container">
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        :width="240"
      >
        <Logo :collapsed="collapsed" :isVertical="false" />
        <Menu mode="vertical" />
      </a-layout-sider>
      <a-layout class="layout-container-box">
        <a-layout-header class="flex justify-between" style="background: #fff; padding: 0">
          <div>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>
          <Logout />
        </a-layout-header>
        <a-layout-content
          class="main-box"
        >
          <main>
            <router-view></router-view>
          </main>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>

  <script lang="ts" setup>
  import { ref } from 'vue';
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router'
  import Logout from './components/Logout.vue'
  import Logo from './components/Logo.vue'
  import Menu from './components/Menu.vue'

  const router = useRouter()
  
  const selectedKeys = ref<string[]>(['1']);
  const collapsed = ref<boolean>(false);



  </script>

  <style scoped lang="scss">
  .layout-container{
    height: 100vh;
    background: #001529;
  }
  .layout-container-box {
    margin: 10px 10px 10px 0;
    border-radius: 10px;
    overflow: hidden;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .trigger:hover {
    color: #1890ff;
  }
  
  .ant-layout-sider .logo {
    height: 42px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    text-align: center;
    line-height: 42px;
    color: #fff;
    font-weight: 700;
    font-size: 22px;
    cursor: pointer;
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }

  .main-box {
    padding: 24px;
    height: calc(100vh - 64rpx);
    overflow-y: scroll;
    main {
      background: #fff;
      border-radius: 10px;
      padding: 24px 16px;
    }
  }
  </style>