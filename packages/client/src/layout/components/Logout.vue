<template>
    <div class="px-[24px] space-x-4">
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
        <SettingOutlined class="cursor-pointer" style="color: #fff" @click="onShowSetting" />

        <a-drawer
          v-model:open="showSetting"
          class="custom-class"
          root-class-name="root-class-name"
          :root-style="{ color: 'blue' }"
          style="color: red"
          title="Basic Drawer"
          placement="right"
        >
          <a-form :layout="{}" :model="formState" v-bind="{}">
            <a-form-item label="Form Layout">
              <a-radio-group v-model:value="formState.layout">
                <a-radio-button value="horizontal">Horizontal</a-radio-button>
                <a-radio-button value="vertical">Vertical</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-drawer>
    </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { DownOutlined, SettingOutlined } from '@ant-design/icons-vue'
  
  const router = useRouter()

  const showSetting = ref(false)

  const formState = ref({
    layout: 'Horizontal'
  })


  const onClick = ({ key }) => {
    if (key === 'logout') {
      router.push('/login')
    }
  }

  const onShowSetting = () => {
    showSetting.value = true
  }

</script>