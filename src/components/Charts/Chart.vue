<template>
  <div :id="id" />
</template>

<script>
import { onMounted, reactive, watch } from "vue";

import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

let updateTimer;

export default {
  name: "Chart",
  props: {
    id: {
      required: true,
      type: String,
      default: null,
    },

    dataSets: {
      required: false,
    },

    labels: {
      required: false,
      type: Array,
      default: () => [],
    },

    startDate: {
      required: false,
      type: Date,
      default: null,
    },

    endDate: {
      required: false,
      type: Date,
      default: null,
    },

    dataPoints: {
      required: false,
    },

    countLabel: {
      required: false,
      type: String,
      default: "Count",
    },

    title: {
      required: false,
      type: String,
    },

    height: {
      required: false,
      type: Number,
      default: 300,
    },

    type: {
      required: false,
      type: String,
      default: "bar",
    },

    yMarkers: {
      required: false,
      type: Array,
      default: () => null,
    },

    yRegions: {
      required: false,
      type: Array,
      default: () => null,
    },

    colors: {
      required: false,
      type: Array,
      default: () => ["purple", "#ffa3ef", "light-blue"],
    },

    isNavigable: {
      required: false,
      type: Boolean,
      default: false,
    },

    valuesOverPoints: {
      required: false,
      type: Boolean,
      default: false,
    },

    lineOptions: {
      required: false,
      type: Object,
      default() {
        return {
          dotSize: 4,
          hideLine: 0,
          hideDots: 0,
          heatline: 0,
          regionFill: 0,
          areaFill: 0,
        };
      },
    },

    axisOptions: {
      required: false,
      type: Object,
      default() {
        return {
          yAxisMode: "",
          xAxisMode: "",
          xIsSeries: 0,
        };
      },
    },

    maxLegendPoints: {
      required: false,
      type: Number,
      default: 20,
    },

    maxSlices: {
      required: false,
      type: Number,
      default: 20,
    },

    barOptions: {
      required: false,
      type: Object,
      default() {
        return {
          height: 20,
          depth: 2,
          spaceRatio: 0.5,
          stacked: 0,
        };
      },
    },

    discreteDomains: {
      required: false,
      type: Boolean,
      default: true,
    },

    tooltipOptions: {
      required: false,
      type: Object,
      default() {
        return {
          formatTooltipX: (d) => String(d).toUpperCase(),
          formatTooltipY: (d) => d + " pts",
        };
      },
    },
  },

  setup(props) {
    const state = reactive({
      chart: null,
      data: {
        labels: props.labels,
        datasets: props.dataSets,
        yMarkers: props.yMarkers,
        yRegions: props.yRegions,
      },
      heatmapData: {
        dataPoints: props.dataPoints,
        start: props.startDate,
        end: props.endDate,
        countLabel: props.countLabel,
      },
    });

    watch(
      () => [props.labels, props.dataSets, props.yMarkers, props.yRegions],
      () => {
        updateDebounced();
      }
    );

    onMounted(() => {
      startChart();
    });

    function startChart() {
      const baseOptions = {
        type: props.type,
        discreteDomains: props.discreteDomains,
        colors: props.colors,
        height: props.height,
        title: props.title,
        isNavigable: props.isNavigable,
      };

      const heatMapOptions = {
        data: props.heatmapData,
      };

      const chartOptions = {
        data: state.data,
        tooltipOptions: props.tooltipOptions,
        valuesOverPoints: props.valuesOverPoints,
        barOptions: props.barOptions,
        lineOptions: props.lineOptions,
        axisOptions: props.axisOptions,
        maxLegendPoints: props.maxLegendPoints,
        maxSlices: props.maxSlices,
      };

      const options = Object.assign(
        baseOptions,
        props.type === "heatmap" ? heatMapOptions : chartOptions
      );

      state.chart = new Chart(`#${props.id}`, options);
    }

    function exportChart() {
      state.chart.export();
    }

    function addDataPoint(label, valueFromEachDataset, index) {
      state.chart.addDataPoint(label, valueFromEachDataset, index);
    }

    function removeDataPoint(index) {
      state.chart.removeDataPoint(index);
    }

    function updateDataset(datasetValues, index) {
      state.chart.updateDataset(datasetValues, index);
    }

    function updateDebounced() {
      if (updateTimer) {
        window.clearTimeout(updateTimer);
        updateTimer = null;
      }
      updateTimer = window.setTimeout(() => {
        update();
      }, 1);
    }

    function update() {
      const data = {
        labels: props.labels,
        datasets: props.dataSets,
        yMarkers: props.yMarkers,
        yRegions: props.yRegions,
      };
      state.chart.update(data);
    }

    function unbindWindowEvents() {
      state.chart.unbindWindowEvents();
    }
  },
};
</script>
