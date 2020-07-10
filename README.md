# remax-chart
echarts for remax

## 支持的平台
| 平台            | 是否支持 |
| -------------- | ------- |
| Web            |    √    |
| 微信小程序       |    √    |
| 支付宝小程序     |    √    |
| 头条小程序       |    x    |

## API
> * 标记为必填属性

| 属性名           | 值类型`(默认值)` |
| -------------- | -------         |
| option *       | EChartOption    |
| theme          | string          |
| width          | string          |
| height         | string          |
| onCreated      | (chart: echarts.EChart) => void  |
| onUpdated      | () => void      |
| onDispose      | () => void      |

## 路线图
- [ ] 适配头条小程序
- [ ] 增加 Tooltip 功能