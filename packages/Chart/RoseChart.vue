<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import chartResize from "./mixins/chart-resize.js";

export default {
  mixins: [chartResize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chartEleResizeListener();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$el);
      this.chart.setOption({
        title: {
          text: "南丁格尔玫瑰图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6"]
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            roseType: "area",
            data: [
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 40, name: "rose6" }
            ]
          }
        ]
      });
    }
  }
};
</script>
