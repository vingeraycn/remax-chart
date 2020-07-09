import { EChartOption } from 'echarts'
import DefaultChart from './index.web'
import Canvas2DChart from './Canvas2DChart'
import CanvasContextChart from './CanvasContextChart'
import React from 'react'

export interface RemaxChartProps {
  option: EChartOption
  onUpdated?: () => void
  onCreated?: () => void
}
const RemaxChart = (props: RemaxChartProps) => {
  const platform = process.env.REMAX_PLATFORM

  if (platform === 'wechat') {
    return <Canvas2DChart {...props} />
  }

  if (platform === 'toutiao' || platform === 'ali') {
    return <CanvasContextChart {...props} />
  }

  return <DefaultChart {...props} />
}

export default RemaxChart
