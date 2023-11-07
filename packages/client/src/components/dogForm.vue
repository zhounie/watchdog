<script lang="ts">
import { defineComponent, reactive, shallowRef, computed, ref } from 'vue'
import type { FormLayout, FormInstance } from 'ant-design-vue/es/form/Form'

type DogFormProps = {
    layout: FormLayout,
    fields: {},
    modelValue: {}
}
export default defineComponent((props: DogFormProps) => {

    const rawForm = ref(props.modelValue)

    const formRef = shallowRef<FormInstance>()

    const resetFields = () => {
        formRef.value?.resetFields()
    }

    return {
        resetFields,
        rawForm,
        formRef
    }

}, {
    name: 'dogForm',
    props: {
        layout: {
            type: String,
            default: false
        },
        modelValue: {
            type: Object,
            default: () => ({})
        },
        fields: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['update:modelValue']
})
</script>

<template>
    <div>
        <a-form
            ref="formRef"
            :model="modelValue"
            name="basic"
            autocomplete="off"
            :layout="layout"
        >
            <a-form-item
                v-for="(field, key) in fields"
                :label="field.label"
                :name="key"
            >
                <a-input v-model:value="modelValue[key]" @input="$emit('update:modelValue', modelValue)" />
            </a-form-item>
        </a-form>
    </div>
</template>

<style lang="scss" scoped></style>