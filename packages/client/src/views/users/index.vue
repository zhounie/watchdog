<script lang="ts" setup>
    import { onMounted, ref, reactive, defineOptions, nextTick, h, shallowRef } from 'vue'
    import { GetUserList, DeleteUser, AddUser, ChangeUser } from '../../api/index'
    import { message, Modal } from 'ant-design-vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { cloneDeep } from 'lodash'
    
    fetch('/url2222', {
            method: "post"
    })
    .then(res => {
        console.log(res);
        
    })
    .catch((error) => {
        console.log(error);
        
    })

    defineOptions({
        name: 'Users'
    })

    const [modal, contextHolder] = Modal.useModal()

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

    const page = reactive({
        pageSize: 10,
        current: 1,
        total: 0
    })

    const formRef = shallowRef()
    const dialog = reactive({
        show: false,
        title: '',
        fields: {
            username: {
                label: '用户名'
            },
            password: {
                label: '密码'
            }
        },
        form: {
            username: ''
        },
        conform: () => {
            let Api = AddUser
            if (dialog.title === '编辑') {
                Api = ChangeUser
            }
            Api(dialog.form).then(res=>{
                if(res.code === 200) {
                    dialog.show = false
                    message.success(`${dialog.title}成功`)
                    getList()
                } else {
                    message.error(res.msg)
                }
            })
        },
        close() {
            formRef.value.resetFields()
        }
    })

    const onAdd = () => {
        dialog.title = '新增'
        dialog.show = true
    }

    const onDelete = (row) => {

        modal.confirm({
            title: '删除确认',
            icon: h(ExclamationCircleOutlined),
            content: '确认删除该数据吗?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                DeleteUser({
                    id: row._id
                }).then(res=>{
                    if(res.code === 200) {
                        getList()
                        message.success('删除成功')
                    } else {
                        message.error(res.msg)
                    }
                })
            }
        });
        
    }

    const onChange = (row) => {
        dialog.title = '编辑'
        dialog.show = true
        nextTick(() => {
            dialog.form = cloneDeep(row)
        })
    }

    const getList = () => {
        let params = {
            ...form.value,
            pageSize: page.pageSize,
            pageNum: page.current
        }
        GetUserList(params).then(res=>{
            if (res.code === 200) {
                data.value = res.data.items
                page.total = res.data.page.total
            } else {
                message.error(res.msg)
            }
        })
    }

    const handleTableChange = ({ current, pageSize }) => {
        page.current = current
        page.pageSize = pageSize
        getList()
        
    }

    const onSearch=  () => {
        getList()
    }
    const onReset = () => {
        getList()
    }

    onMounted(() => {
        getList()
    })
</script>

<template>
    <div>
        <img src="/a.png" alt="">
        <dogSearch v-model="form" :fields="fields" @search="onSearch" @reset="onReset">
            <template #button>
                <a-button type="primary" @click="onAdd">新增用户</a-button>
            </template>
        </dogSearch>
        <dogTable :columns="columns" :data="data" :pagination="page"  @change="handleTableChange">
            <template #button="{row}">
                <a-button type="link" @click="onChange(row)">编辑</a-button>
                <a-button type="link" danger @click="onDelete(row)">删除</a-button>
            </template>
        </dogTable>

        <a-modal v-model:open="dialog.show" :title="dialog.title" :afterClose="dialog.close" @ok="dialog.conform">
            <dog-form ref="formRef" v-model="dialog.form" :fields="dialog.fields"></dog-form>
        </a-modal>

        <contextHolder />
    </div>
</template>