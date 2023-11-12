<template>
    <a-layout class="layout-container">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline"
          :items="menu"
        @select="onSelectMenu">
        </a-menu>
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
          <div class="px-[24px]">
            <a-dropdown :arrow="true">
              <a class="ant-dropdown-link" @click.prevent>
                <a-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="onClick">
                  <a-menu-item key="logout">
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
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
  import { DownOutlined } from '@ant-design/icons-vue'
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
    },{
      key: 'performance',
      label: 'performance',
      title: 'performance'
    }
  ])

  const onSelectMenu = ({ key }) => {
    router.push(`/${key}`)
  }

  const onClick = ({ key }) => {
    if (key === 'logout') {
      router.push('/login')
    }
  }
  </script>

  <style scoped lang="scss">
  .layout-container{
    height: 100vh;
    background: #001529;
  }
  .layout-container-box {
    margin: 10px;
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