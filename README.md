# Vue 3 Frappe Charts

<p align="center">
    <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
        <img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo">
    </a>
    <a href="https://frappe.github.io/charts" target="_blank" rel="noopener noreferrer">
        <img src="https://frappe.io/files/frappe.png" width="200">
    </a>
</p>

[![npm version](https://badge.fury.io/js/%40pathscale%2Fvue3-charts.svg)](https://badge.fury.io/js/%40pathscale%2Fvue3-charts)

This is a simple package to get using Frappe Charts within VueJS

## How to use

First we need to import and initialize

```es6
import Chart from "@pathscale/@pathscale/vue3-charts";

export default {
    components: {
        Chart
    },
  },
};
```

Then in our Vue templates:

```html
<template>
  <chart
    id="test"
    title="Monthly Distribution"
    type="pie"
    :height="300"
    :labels="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
    :colors="['red']"
    :discrete-domains="false"
    :data-sets="data"
  />
</template>
<script>
  export default {
    name: "ChartShowcase",
    components: { Chart },
    setup() {
      const data = [{ values: [18, 40, 30, 35, 8, 52, 17, -4] }];
      return {
        data,
      };
    },
  };
</script>
```

There are more examples in the `examples` directory

### Links

[Frappe Charts](https://github.com/frappe/charts)

[Vue JS](https://vuejs.org/)
