<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { FormLayout } from 'ant-design-vue/es/form/Form'

type DogFormProps = {
    layout: FormLayout,
    fields: {}
}
export default defineComponent((props: DogFormProps) => {
    
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
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return {
        formState,
        onFinish,
        onFinishFailed
    }
}, {
    name: 'dogForm',
    props: {
        layout: {
            type: String,
            default: false
        },
        form: {},
        fields: {
            type: Object,
            default: () => ({})
        }
    }
})
</script>

<template>
    <div>
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            :layout="layout"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                v-for="(field, key) in fields"
                :label="field.label"
                :name="key"
            >
                <a-input v-model:value="formState.username" />
            </a-form-item>
        </a-form>
    </div>
</template>

<style lang="scss" scoped></style>