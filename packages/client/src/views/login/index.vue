<script lang="ts" setup>
import { Login } from '../../api/index'
import { reactive } from 'vue';
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons-vue'

const router = useRouter()

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const onFinish = (values: any) => {
    Login(formState).then(res=>{
        if(res.code === 200) {
            localStorage.setItem('token', res.data)
            router.push('/')
        } else {
            message.error(res.msg)
        }
    })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
    <div class="login">
        <div class="login-box p-6 pt-8">
            <h4 class="font-size-6 text-center font-500 text-white pb-4">登录</h4>
            <a-form
                :model="formState"
                size="large"
                name="basic"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >   
                <a-form-item>
                    <a-input v-model:value="formState.username" placeholder="Username">
                        <template #prefix>
                            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input v-model:value="formState.password" type="password" placeholder="Password">
                        <template #prefix>
                            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" size="large" block html-type="submit">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    height: 100vh;
    background: url('@/assets/images/bg.jpg') no-repeat center / cover;
    .login-box {
        width: 600px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .login-box::before {
        content: '';
        border-radius: 6px;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, .3);
        backdrop-filter: blur(10px);
        z-index: -1;
    }
}
</style>
