import BaseChart, { BaseChartProps, BaseChartType } from './BaseChart'
import { Canvas as WeChatCanvas } from 'remax/wechat'
import { Canvas as AliCanvas } from 'remax/ali'
import { Canvas as TTCanvas } from 'remax/toutiao'
import * as React from 'react'

export interface RemaxChartProps extends Omit<BaseChartProps, 'type' | 'container'> {}
const RemaxChart = (props: RemaxChartProps) => {
  const platform = process.env.REMAX_PLATFORM

  if (platform === 'wechat') {
    return <BaseChart type={BaseChartType.CANVAS_2D} container={WeChatCanvas} {...props} />
  }

  if (platform === 'ali') {
    return <BaseChart type={BaseChartType.CANVAS_CONTEXT} container={AliCanvas} {...props} />
  }

  if (platform === 'toutiao') {
    return <BaseChart type={BaseChartType.CANVAS_CONTEXT} container={TTCanvas} {...props} />
  }

  return <BaseChart {...props} />
}

export default RemaxChart
