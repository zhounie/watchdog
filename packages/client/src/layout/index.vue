<template>
    <a-layout class="layout-container">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline"
          :items="menu"
        @select="onSelectMenu">
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
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
  const router = useRouter()
  
  const selectedKeys = ref<string[]>(['1']);
  const collapsed = ref<boolean>(false);

  const menu = ref([
    {
      key: 'errors',
      label: 'errors',
      title: 'errors'
    },{
      key: 'users',
      label: 'users',
      title: 'users'
    }
  ])

  const onSelectMenu = ({ key }) => {
    router.push(`/${key}`)
  }
  </script>

  <style scoped lang="scss">
  .layout-container{
    height: 100vh;
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
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
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