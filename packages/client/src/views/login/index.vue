<script lang="ts" setup>
import { Login } from '../../api/index'
import { reactive } from 'vue';
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router';

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
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
            >
            <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formState.password" />
            </a-form-item>


            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
