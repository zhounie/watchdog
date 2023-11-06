<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent((props) => {

    return {

    }
}, {
    name: 'dogSearch',
    props: {

    }
})

</script>

<template>
    <dogForm v-model="modelValue" v-bind="$attrs" layout="inline" />
</template>