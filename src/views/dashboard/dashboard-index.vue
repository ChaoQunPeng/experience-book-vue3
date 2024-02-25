<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-15 10:25:13
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-25 19:35:59
 * @FilePath: /experience-book-vue3/src/views/dashboard/dashboard-index.vue
 * @Description: 
-->
<template>
  <a-row :gutter="20" class="h-screen bg-eb-blue p-20">
    <a-col :span="12">
      <div class="card-area mb-20">
        <a-card title="经验值统计" class="chart-card h-full">
          <div id="Statistics" class="h-full"></div>
        </a-card>
      </div>
    </a-col>

    <a-col :span="12">
      <div class="card-area mb-20">
        <a-card title="笔记数统计" class="chart-card h-full">
          <div id="NoteTotalStatistics" class="h-full"></div>
        </a-card>
      </div>
    </a-col>

    <a-col :span="24">
      <div class="card-area">
        <a-card title="学习趋势" class="chart-card h-full">
          <div id="Trend" class="h-full"></div>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { SkillApi } from '@/api/skill';
import { resolveColorValue } from '@/utils/exp-helper';
import { Column, Datum, Line } from '@antv/g2plot';
import { message } from 'ant-design-vue';
import { onMounted } from 'vue';

/**
 * 获取技能经验值统计
 */
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
    appendPadding: [20, 0, 0, 0],
    label: {
      position: 'top',
      content: data => {
        return data.totalExp + 'exp';
      },
      style: {
        fontSize: 14,
        fill: 'rgba(31, 51, 73, 0.65)'
      }
    },
    color: ({ name }) => {
      const item = result.data.find((e: { name: string }) => e.name == name);

      return resolveColorValue(item.totalExp);
    },
    columnWidthRatio: 0.2,
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

/**
 * 技能笔记数统计
 */
onMounted(async () => {
  const result = await SkillApi.getNoteStatistics();

  if (result.code == 0) {
    message.error(`获取统计失败`);
    return;
  }

  const columnPlot = new Column('NoteTotalStatistics', {
    data: result.data,
    isStack: true,
    seriesField: 'hasExp',
    legend: {
      position: 'top'
    },
    tooltip: {
      title: data => {
        const total = result.data
          .filter((e: any) => e.name == data)
          .reduce((acc: any, cur: any) => {
            return (acc += cur.total);
          }, 0);

        return data + `-共${total}篇`;
      }
    },
    color: datum => {
      if (datum.hasExp == 'exp=0的笔记数') {
        return '#e31700';
      } else {
        return '#FA9A25';
      }
    },
    xField: 'name',
    yField: 'total',
    slider: undefined,
    label: {
      position: 'right',
      content: data => {
        return data.total + '篇';
      },
      style: {
        fontSize: 14,
        fill: 'rgba(31, 51, 73, 0.85)'
      }
    },
    columnWidthRatio: 0.2,
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
      total: {
        alias: '经验值'
      }
    }
  });

  columnPlot.render();
});

/**
 * 经验趋势统计
 */
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
    smooth: false,
    area: {
      style: {
        fillOpacity: 0
      }
    },
    tooltip: {
      formatter: (datum: Datum) => {
        return { name: datum.skill, value: datum.exp + 'exp' };
      }
    },
    xAxis: {
      tickCount: 7,
      tickInterval: 1,
      // 这个属性可以修改折线图的起始点和结束点。即到图表两端空白的距离。
      range: [0.02, 0.98]
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
@/utils/exp-helper
