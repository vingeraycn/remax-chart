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

## 运行示例
```bash
git clone https://github.com/LeiHanCN/remax-chart.git
cd remax-chart
yarn
# if you need run at wechat miniapp, just run `yarn dev wechat`
# run at ali platform, run `yarn dev ali`
# run at toutiao, run `yarn dev toutiao`
# run at web, run `yarn dev web`
yarn dev [platform]
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

## 提示
##### 运行在小程序端
ECharts 官方对小程序运行环境下适配了大多数功能，还有部分功能还未适配，[查看详情](https://github.com/ecomfe/echarts-for-weixin#%E6%9A%82%E4%B8%8D%E6%94%AF%E6%8C%81%E7%9A%84%E5%8A%9F%E8%83%BD)。

另外目前在小程序端还不支持 tooltip。

##### 运行在 Web 端
可以正常使用。