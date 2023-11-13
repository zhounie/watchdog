<template>
    <a-layout class="vertical-layout">
      <a-layout-header>
        <div class="logo" />
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
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
  const selectedKeys = ref<string[]>(['2']);
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
  }
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
//   .site-layout .site-layout-background {
//     background: #fff;
//   }
  
//   [data-theme='dark'] .site-layout .site-layout-background {
//     background: #141414;
//   }
  </style>