import React from 'react'
import { Canvas as TTCanvas } from 'remax/toutiao'
import BaseChart, { BaseChartType } from '@/BaseChart'
import { MOCK_OPTION } from '@/config'

const Chart = (props: any) => (
  <BaseChart
    type={BaseChartType.CANVAS_CONTEXT}
    container={TTCanvas}
    option={MOCK_OPTION}
    {...props}
  />
)

export default Chart
