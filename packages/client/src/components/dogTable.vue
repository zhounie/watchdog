<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { TableColumnType } from 'ant-design-vue'

type DogTableProps = {
    columns: Record<string, string | TableColumnType>,
    data: [],
    page: {}
}

export default defineComponent((props: DogTableProps, { slots }) => {
    
    const rawColumns = Object.entries(props.columns).map(([key, options])=> {
        if (typeof options === 'string') {
            return {
                title: options,
                dataIndex: key,
                key
            }
        }
        return {
            ...options,
            dataIndex: key,
            key
        }
    })
    
    if(typeof slots.button === 'function') {
        rawColumns.push({
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: 200,
        })
    }
    
    
    return {
        rawColumns
    }
}, {
    name: 'dogTable',
    props: {
        columns: {
            type: Object,
            default: () => ({})
        },
        data: {
            type: Array,
            default: () => []
        },
        page: {
            type: Object
        }
    }
})
</script>

<template>
    <div>
        <a-table :dataSource="data" :columns="rawColumns" v-bind="$attrs">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'operation'">
                    <slot name="button" :row="record" :column="column"></slot>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style lang="scss" scoped></style>