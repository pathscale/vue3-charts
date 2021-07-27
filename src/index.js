import { Chart } from './components/Charts'

Chart.install = (app, options = {}) => {
  app.component(Chart.name, Chart)

  if (options?.plugins?.length) {
    Chart.registerGlobalPlugins(options.plugins)
  }
}

export default Chart