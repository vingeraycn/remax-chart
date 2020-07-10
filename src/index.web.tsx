import * as React from 'react'
// @ts-ignore
import BaseChart, { BaseChartType } from './BaseChart'
import { MOCK_OPTION } from './config'

const Chart = (props: any): JSX.Element => {
  return <BaseChart type={BaseChartType.CANVAS_2D} option={MOCK_OPTION} {...props} />
}

export default Chart
