<script lang="ts">
import { defineComponent, shallowRef } from 'vue'

export default defineComponent((props, { emit }) => {

    const formRef = shallowRef()

    const onReset = () => {
        formRef.value.resetFields()
        emit('reset')
    }
    return {
        onReset,
        formRef
    }
}, {
    name: 'dogSearch',
    props: {

    },
    emits: ['search', 'reset']
})

</script>

<template>
    <div class="dog-search flex justify-between pb4">
        <a-space>
            <dogForm ref="formRef" v-model="modelValue" v-bind="$attrs" layout="inline" />
            <a-space>
                <a-button type="primary" @click="$emit('search')">搜索</a-button>
                <a-button @click="onReset">重置</a-button>
            </a-space>
        </a-space>
        <div>
            <slot name="button"></slot>
        </div>
    </div>
</template>
