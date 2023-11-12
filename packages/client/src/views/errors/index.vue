<script lang="ts" setup>
    import { onMounted, ref, reactive, defineOptions, nextTick, h, shallowRef } from 'vue'
    import { GetErrorsList } from '../../api/index'
    import { message, Modal } from 'ant-design-vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { cloneDeep } from 'lodash'
    import dayjs from 'dayjs'
    defineOptions({
        name: 'Errors'
    })

    const [modal, contextHolder] = Modal.useModal()

    const Type = [
        '',
        'TypeError',
        'ReferenceError',
        'SyntaxError',
        'RangeError',
        'URIError',
        'SourceError',
        'AxiosError'
    ]
    const form = ref({
        times: []
    })
    const fields = reactive({
        type: {
            label: "报错类型",
            type: 'select',
            options: Type.map((item, index)=> ({
                label: item,
                value: index
            }))
        },
        times: {
            label: '报错时间',
            type: 'daterange'
        }
    })

    const columns = ref({
        type: {
            title: '错误类型',
            customRender: ({ record }) => {
                return Type[record.type]
            }
        },
        message: 'Message',
        source: '报错文件',
        lineno: 'lineno',
        colno: 'colno',
        tag: '错误标签',
        url: '报错路径',
        requestUrl: '请求路径',
        requestParams: '请求参数',
        header: {
            title: '请求头',
            width: 300
        },
        responseUrl: '响应路径',
        responseStatus: '响应状态',
        errorTime: {
            title: '报错时间',
            width: 200,
            customRender: ({record}) => {
                if (record.errorTime) {
                    return dayjs(record.errorTime).format('YYYY-MM-DD HH:mm:ss') 
                }
            }
        },
        userAgent: {
            title: 'userAgent',
            width: 400
        }
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
        if (Array.isArray(params.times) && params.times.length) {
            params.startTime = params.times[0].valueOf()
            params.endTime = params.times[1].valueOf()
            delete params.times
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