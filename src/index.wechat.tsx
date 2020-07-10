import React from 'react'
import BaseChart, { BaseChartType } from './BaseChart'
import { Canvas as WeChatCanvas } from 'remax/wechat'
import { MOCK_OPTION } from './config'

const Chart = (props: any) => (
  <BaseChart
    type={BaseChartType.CANVAS_2D}
    container={WeChatCanvas}
    option={MOCK_OPTION}
    {...props}
  />
)

export default Chart
