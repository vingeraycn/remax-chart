import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useNativeEffect } from 'remax'
import { Canvas as WechatCanvas } from 'remax/wechat'
import * as echarts from 'echarts'
import { EChartOption } from 'echarts'
import ChartCanvas from './ChartCanvas'

export interface ChartProps {
  option: EChartOption
  onUpdated?: () => void
  onCreated?: () => void
}

const Chart = ({ option, onCreated, onUpdated, ...props }: ChartProps): JSX.Element => {
  const ref = useRef<echarts.ECharts>(null)
  const id = useMemo(() => `chart_${Math.random().toFixed(3).replace('.', '_')}`, [])

  const updateOption = useCallback((option: EChartOption) => {
    const chart = ref.current

    if (!chart || !option) {
      return
    }
    chart.setOption(option, { notMerge: true })
  }, [])

  const initChart = (canvas: any, width: number, height: number, dpr: number) => {
    echarts.setCanvasCreator(() => canvas)
    const chart = echarts.init(canvas, undefined, {
      width,
      height,
      devicePixelRatio: dpr, // 像素
    })

    canvas.setChart(chart)
    // @ts-ignore
    ref.current = chart
    updateOption(option)

    return chart
  }

  const init = () => {
    const query = wx.createSelectorQuery()
    query
      .select(`#${id}`)
      .fields({ node: true, size: true })
      .exec(([{ node: canvasNode, width, height }]) => {
        const ctx = canvasNode.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        const canvas = new ChartCanvas(ctx, `#${id}`, true, canvasNode)

        canvasNode.width = width * dpr
        canvasNode.height = height * dpr
        ctx.scale(dpr, dpr)
        initChart(canvas, width, height, dpr)
      })
  }

  useNativeEffect(() => {
    init()
  }, [])

  useEffect(() => {
    updateOption(option)
  }, [option, updateOption])

  return <WechatCanvas type="2d" id={id} style={{ width: '100vw', height: '30vh' }} {...props} />
}

export default Chart
