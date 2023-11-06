<script lang="ts" setup>
    import { onMounted, ref, reactive } from 'vue'
    import { GetUserList, DeleteUser } from '../../api/index'
    import { message } from 'ant-design-vue'

    const form = ref({})
    const fields = reactive({
        username: {
            label: '用户名'
        }
    })

    const columns = ref({
        username: '账户'
    })
    const data = ref([])

    const onDelete = (row) => {
        DeleteUser({
            id: row._id
        }).then(res=>{
            if(res.code === 200) {
                getList()
            } else {
                message.error(res.msg)
            }
        })
    }

    const getList = () => {
        GetUserList().then(res=>{
            if (res.code === 200) {
                data.value = res.data
            } else {
                message.error(res.msg)
            }
        })
    }

    onMounted(() => {
        getList()
    })
</script>

<template>
    <div>
        <dogSearch v-model="form" :fields="fields" />
        <dogTable :columns="columns" :data="data">
            <template #button="{row}">
                <a-button type="link">编辑</a-button>
                <a-button type="link" danger @click="onDelete(row)">删除</a-button>
            </template>
        </dogTable>
    </div>
</template>