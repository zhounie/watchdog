<script lang="ts" setup>
    import { onMounted, ref, reactive, defineOptions, nextTick, h, shallowRef } from 'vue'
    import { GetPerformanceList, DeleteUser, AddUser, ChangeUser } from '../../api/index'
    import { message, Modal } from 'ant-design-vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { cloneDeep } from 'lodash'
    import dayjs from 'dayjs'

    defineOptions({
        name: 'Performance'
    })

    const [modal, contextHolder] = Modal.useModal()

    const form = ref({})
    const fields = reactive({
        href: {
            label: 'href'
        }
    })

    const columns = ref({
        href: 'href',
        lcp: {
            title: 'LCP',
            customRender: ({ record }) => {
                return `${Number(record.lcp).toFixed(2)}ms`
            }
        },
        fid: {
            title: 'FID',
            customRender: ({ record }) => {
                return `${Number(record.fid).toFixed(2)}ms`
            }
        },
        cls: {
            title: 'CLS',
            customRender: ({ record }) => {
                return `${Number(record.cls).toFixed(2)}ms`
            }
        },
        userAgent: 'userAgent',
        createTime: {
            title: 'createTime',
            customRender: ({ record }) => {
                return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
            }
        }
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
        GetPerformanceList(params).then(res=>{
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
        <dogSearch v-model="form" :fields="fields" @search="onSearch" @reset="onReset">
        </dogSearch>
        <dogTable :columns="columns" :data="data" :pagination="page"  @change="handleTableChange">
        </dogTable>
        <contextHolder />
    </div>
</template>