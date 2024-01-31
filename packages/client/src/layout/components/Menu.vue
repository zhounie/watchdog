<script lang="ts" setup>
  import { ref, defineProps, withDefaults } from 'vue';
  import { useRouter } from 'vue-router'
  import { menu } from '@/config/menu'

  const props = withDefaults(defineProps<{
    mode: 'horizontal' | 'inline' | 'vertical'
  }>(), {
    mode: 'horizontal'
  })

  const router = useRouter()
  const selectedKeys = ref<string[]>(['2']);

  const onSelectMenu = ({ key }) => {
    router.push(`/${key}`)
  }

</script>

<template>
    <div class="menu">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            :mode="mode"
            :items="menu"
            @select="onSelectMenu"
        >
        </a-menu>
    </div>
</template>

<style lang="scss" scoped>
.menu {
  :deep(.ant-menu) {
    .ant-menu-item {
      height: 50px;
      line-height: 50px;
      margin: 4px 0 4px 4px;
      width: 100%;
      box-sizing: border-box;
      width: calc(100% - 4px);
      border-radius: 8px 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }
    .ant-menu-item:not(.ant-menu-item-selected):active {
      background: #cfcfcf;
      color: #fff;
    }
    .ant-menu-item.ant-menu-item-selected {
      background: #f5f5f5;
      color: #001529;
    }
  }
  :deep(.ant-menu-horizontal) {
    .ant-menu-item {
      width: auto;
      border-radius: 8px;
    }
  }
}
</style>