# remax-chart
从此 RemaxJS 也有 ECharts 图表📈套件啦~

## 支持平台
| 平台            | 是否支持 |
| -------------- | ------- |
| Web            |    √    |
| 微信小程序       |    √    |
| 支付宝小程序     |    √    |
| 头条小程序       |    x    |


## 快速上手

```bash
# 安装依赖
npm i remax
npm i remax-chart

# or use yarn
yarn add remax
yarn add remax-chart

```

```tsx
const option = {
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

import RemaxChart from 'remax-chart'

const LineChart = () => {
  return <RemaxChart option={option} height="30vh" />
}

export default LineChart
```

## API
> * 标记为必填属性

| 属性名          | 值类型`(默认值)`                      |
| -------------- | ---------------------------------  |
| option *       | EChartOption                       |
| theme          | string                             |
| width          | string                             |
| height         | string                             |
| onCreated      | (chart: echarts.EChart) => void    |
| onUpdated      | () => void                         |
| onDispose      | () => void                         |


## 路线图
- [ ] 增加 Tooltip 功能