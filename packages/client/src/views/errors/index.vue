<script lang="ts" setup>
    import { onMounted, ref, reactive, defineOptions, nextTick, h, shallowRef } from 'vue'
    import { GetErrorsList } from '../../api/index'
    import { message, Modal } from 'ant-design-vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { cloneDeep } from 'lodash'
    defineOptions({
        name: 'Errors'
    })

    const [modal, contextHolder] = Modal.useModal()

    const form = ref({})
    const fields = reactive({
        href: {
            label: 'href'
        }
    })

    const columns = ref({
        type: {
            title: '错误类型',
            customRender: ({ record }) => {
                const Type = [
                    '',
                    'TypeError',
                    'ReferenceError',
                    'SyntaxError',
                    'RangeError',
                    'URIError',
                    'SourceError'
                ]
                return Type[record.type]
            }
        },
        message: 'Message',
        source: '报错文件',
        lineno: 'lineno',
        colno: 'colno',
        tag: '错误标签',
        url: '报错路径',
        errorTime: '报错时间',
        userAgent: 'userAgent'
    })
    const data = ref([])

    const page = reactive({
        pageSize: 10,
        current: 1,
        total: 0
    })


    const getList = () => {
        let params = {
            ...form.value,
            pageSize: page.pageSize,
            pageNum: page.current
        }
        GetErrorsList(params).then(res=>{
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
            <template>

            </template>
        </dogTable>
        <contextHolder />
        <img src="/app.png" alt="">
    </div>
</template>