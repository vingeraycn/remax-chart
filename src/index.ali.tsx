import React from 'react'
import BaseChart, { BaseChartType } from './BaseChart'
import { Canvas as AliCanvas } from 'remax/ali'
import { MOCK_OPTION } from './config'

const Chart = (props: any) => (
  <BaseChart
    type={BaseChartType.CANVAS_CONTEXT}
    container={AliCanvas}
    option={MOCK_OPTION}
    {...props}
  />
)

export default Chart
