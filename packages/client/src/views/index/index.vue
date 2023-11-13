<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { GetPerformanceStatistics } from '@/api/index'
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts'
import { cloneDeep, debounce } from 'lodash'

const lcpRef = ref()
const lcpData = ref()
const clsRef = ref()
const clsData = ref()
const fidRef = ref()
const fidData = ref()
let lcpChart: ECharts | null = null
let clsChart: ECharts | null = null
let fidChart: ECharts | null = null
const option: EChartsOption = {
  grid: {
    height: '160px'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true
    }
  ]
}
const initChart = () => {
  
  const lcpOptions = cloneDeep(option)
  const clsOptions = cloneDeep(option)
  const fidOptions = cloneDeep(option)
        
  option && lcpChart?.setOption({
    title: {
      text: 'LCP'
    },
    ...lcpOptions,
    series: [
      {
        ...lcpOptions.series[0],
        data: lcpData.value
      }
    ]
  });
  option && clsChart?.setOption({
    title: {
      text: 'CLS'
    },
    ...clsOptions,
    series: [
      {
        ...clsOptions.series[0],
        data: clsData.value
      }
    ]
  });
  option && fidChart?.setOption({
    title: {
      text: 'FID'
    },
    ...fidOptions,
    series: [
      {
        ...fidOptions.series[0],
        data: fidData.value
      }
    ]
  });
}
const _resizeChart = () => {
  console.log('resize');
  
  lcpChart && lcpChart.resize()
  clsChart && clsChart.resize()
  fidChart && fidChart.resize()
}
const resizeChart = debounce(_resizeChart, 500)

onMounted(() => {
  window.addEventListener('resize', resizeChart)
    GetPerformanceStatistics({
      type: 1
    }).then(res=>{
      if (res.code === 200) {
        lcpChart = echarts.init(lcpRef.value);
        clsChart = echarts.init(clsRef.value);
        fidChart = echarts.init(fidRef.value);

        option.xAxis.data = res.data.map(item => item.createTime)
        lcpData.value = res.data.map(item => item.lcp)
        clsData.value = res.data.map(item => item.cls)
        fidData.value = res.data.map(item => item.fid)
        // option.series[3].data = res.data.map(item => item.fid)
        initChart()
      } else {

      }
    })
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
})


</script>

<template>
    <div>
        <!-- <div ref="chatRef" class="h-2xl"></div> -->
        <div class="flex flex-wrap gap-xl">
          <div class="flex-1 min-w-120 max-w-160 bg-white border-rd-2 p-3">
            <div ref="lcpRef" class="h-60 lcp"></div>
          </div>
          <div class="flex-1 min-w-120 max-w-160 bg-white border-rd-2 p-3">
            <div ref="clsRef"  class="h-60 cls"></div>
          </div>
          <div class="flex-1 min-w-120 max-w-160 bg-white border-rd-2 p-3">
            <div ref="fidRef"  class="h-60 fid"></div>
          </div>
        </div>
    </div>
</template>