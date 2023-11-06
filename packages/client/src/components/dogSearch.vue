<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent((props, { emit }) => {

    return {

    }
}, {
    name: 'dogSearch',
    props: {

    },
    emits: ['search', 'reset']
})

</script>

<template>
    <a-space>
        <dogForm v-model="modelValue" v-bind="$attrs" layout="inline" />
        <a-space>
            <a-button type="primary" @click="$emit('search')">搜索</a-button>
            <a-button @click="$emit('reset')">重置</a-button>
        </a-space>
    </a-space>
</template>