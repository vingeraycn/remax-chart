import * as React from 'react'
import { View } from 'remax/one'
import RemaxChart from '../../../src/index'

const MOCK_OPTION = {
  tooltip: {
    show: true,
    confine: true,
    renderMode: 'richText',
    triggerOn: 'mousemove',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    },
  ],
}

const Index = (): JSX.Element => {
  return (
    <View>
      <RemaxChart option={MOCK_OPTION as any} height="30vh" />
    </View>
  )
}

export default Index
