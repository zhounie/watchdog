<script lang="ts">
import { defineComponent, reactive, shallowRef, computed, ref } from 'vue'
import type { FormLayout, FormInstance } from 'ant-design-vue/es/form/Form'
import dayjs from 'dayjs'

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
        formRef,
        dayjs
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
                <a-select
                    v-if="field.type === 'select'"
                    v-model:value="modelValue[key]"
                    style="width: 180px;"
                    @change="$emit('update:modelValue', modelValue)"
                >
                    <a-select-option
                        v-for="(option, index) in field.options"
                        :value="option.value"
                        :key="index"
                    >{{option.label}}</a-select-option>
                </a-select>
                <a-date-picker
                    v-else-if="field.type === 'date'"
                    v-model:value="modelValue[key]"
                    picker="date"
                    @change="$emit('update:modelValue', modelValue)"
                />
                <a-range-picker
                    v-else-if="field.type === 'daterange'"
                    v-model:value="modelValue[key]"
                    picker="date"
                    :showTime="{
                        defaultValue: [
                            dayjs('00:00:00', 'HH:mm:ss'),
                            dayjs('23:59:59', 'HH:mm:ss')
                        ]
                    }"
                    @change="$emit('update:modelValue', modelValue)"
                />
                <a-input v-else v-model:value="modelValue[key]" @input="$emit('update:modelValue', modelValue)" />
            </a-form-item>
        </a-form>
    </div>
</template>

<style lang="scss" scoped></style>