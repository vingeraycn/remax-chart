import { EChartOption } from 'echarts'
import DefaultChart from './index.web'
import WxChart from './index.wechat'
import AliChart from './index.ali'
import React from 'react'

export interface RemaxChartProps {
  option: EChartOption
  onUpdated?: () => void
  onCreated?: () => void
}
const RemaxChart = (props: RemaxChartProps) => {
  const platform = process.env.REMAX_PLATFORM

  if (platform === 'wechat') {
    return <WxChart {...props} />
  }

  if (platform === 'toutiao' || platform === 'ali') {
    return <AliChart {...props} />
  }

  return <DefaultChart {...props} />
}

export default RemaxChart
