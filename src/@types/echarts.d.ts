import { EChartOption as BaseEChartOption } from 'echarts'

declare module 'echarts' {
  export const registerPreprocessor: (preprocessor: (option: echarts.EChartOption) => void) => void
  export const setCanvasCreator: (creator: () => any) => void
  export interface ECharts {
    getZr: () => { handler: any }
  }
}
