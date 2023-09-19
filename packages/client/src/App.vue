<script lang="ts" setup>
    import { ref } from 'vue'
    const value = ref(0)
    
</script>

<template>
    <div>
        我草: {{ value }}
        <button @click="value++">Insert</button>
        <router-view></router-view>
    </div>
</template>