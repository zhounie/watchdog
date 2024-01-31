<script lang="ts" setup>
    import { defineProps, withDefaults } from 'vue'

    const props = withDefaults(defineProps<{
        isVertical?: boolean;
        collapsed?: boolean;
    }>(), {
        isVertical: false
    })
</script>

<template>
    <div class="logo" :class="{ 'is-vertical': isVertical }">
        {{ !collapsed ? 'WatchDog' : 'Dog' }}
    </div>
</template>

<style lang="scss" scoped>
.logo {
    height: 42px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    text-align: center;
    line-height: 42px;
    color: #fff;
    font-weight: 700;
    font-size: 22px;
    cursor: pointer;
}
.logo.is-vertical {
    width: 200px;
}
</style>