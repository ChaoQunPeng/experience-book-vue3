<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-15 10:25:13
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-15 19:48:10
 * @FilePath: /experience-book-vue3/src/views/dashboard/dashboard-index.vue
 * @Description: 
-->
<template>
  <div class="h-screen bg-eb-blue p-20">
    <div class="card-area mb-20">
      <a-card title="技能经验统计" class="chart-card h-full">
        <div id="Statistics" class="h-full"></div>
      </a-card>
    </div>

    <div class="card-area">
      <a-card title="技能学习趋势" class="chart-card h-full">
        <div id="Trend" class="h-full"></div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkillApi } from '@/api/skill';
import { Column, Line } from '@antv/g2plot';
import { message } from 'ant-design-vue';
import { onMounted } from 'vue';

onMounted(async () => {
  const result = await SkillApi.getExpStatistics();

  if (result.code == 0) {
    message.error(`获取统计失败`);
    return;
  }

  const columnPlot = new Column('Statistics', {
    data: result.data,
    xField: 'name',
    yField: 'totalExp',
    label: {
      content: data => {
        return data.totalExp + 'exp';
      },
      style: {
        fontSize: 18  
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: 'rgba(31,51,73,0.10)'
          }
        }
      }
    },
    meta: {
      name: {
        alias: '技能'
      },
      totalExp: {
        alias: '经验值'
      }
    }
  });

  columnPlot.render();
});

onMounted(async () => {
  const result = await SkillApi.getExpTrend();

  if (result.code == 0) {
    message.error(`获取趋势失败`);
    return;
  }

  const line = new Line('Trend', {
    data: result.data,
    xField: 'get_exp_datetime',
    yField: 'exp',
    seriesField: 'skill',
    smooth: true,
    area: {
      style: {
        fillOpacity: 0.15
      }
    },
    // point: {
    //   size: 5,
    //   shape: 'diamond',
    //   style: {
    //     fill: 'white',
    //     stroke: '#5B8FF9',
    //     lineWidth: 2
    //   }
    //   // style: ({}) => {
    //   //   return {
    //   //     fill: 'white',
    //   //     stroke: '#5B8FF9',
    //   //     lineWidth: 2
    //   //   };
    //   // }
    // },
    xAxis: {
      type: 'cat',
      tickCount: 7
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: 'rgba(31,51,73,0.10)'
          }
        }
      }
    }
  });

  line.render();
});
</script>

<style lang="less" scoped>
.chart-card {
  :deep(.ant-card-body) {
    height: calc(100% - 56px);
  }
}

.card-area {
  height: calc((100vh - 60px) / 2);
}
</style>
