<script lang="ts" setup>
import { onMounted } from 'vue'
import { GetErrorsList } from '@/api/index'

onMounted(() => {
    
    GetErrorsList({}).then(res=>{
        if(res.code === '0') {
             
        } else {

        }
    })
})

</script>

<template>
    <div>
        errors
    </div>
</template>