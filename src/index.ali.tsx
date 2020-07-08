import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useNativeEffect } from 'remax'
import { Canvas as AliCanvas } from 'remax/ali'
import * as echarts from 'echarts'
import { EChartOption } from 'echarts'
import ChartCanvas from './ChartCanvas'
import { View } from 'remax/one'

interface ChartProps {
  option: EChartOption
  onUpdated?: () => void
  onCreated?: () => void
}

// @todo support ali
const Chart = ({ option, onCreated, onUpdated, ...props }: ChartProps): JSX.Element => {
  const ref = useRef<echarts.ECharts>(null)
  const id = useMemo(() => `chart_${Math.random().toFixed(3).replace('.', '_')}`, [])

  // const updateOption = useCallback((option: EChartOption) => {
  //   const chart = ref.current
  //
  //   if (!chart || !option) {
  //     return
  //   }
  //   chart.setOption(option, { notMerge: true })
  //   onUpdated?.()
  // }, [])
  //
  // const initChart = useCallback(
  //   function (canvas: any, width: number, height: number, dpr: number) {
  //     echarts.setCanvasCreator(() => canvas)
  //     const chart = echarts.init(canvas, undefined, {
  //       width,
  //       height,
  //       // devicePixelRatio: dpr, // 像素
  //     })
  //
  //     canvas.setChart(chart)
  //     onCreated?.()
  //     // @ts-ignore
  //     ref.current = chart
  //     updateOption(option)
  //
  //     return chart
  //   },
  //   []
  // )

  const init = () => {
    const ctx = my.createCanvasContext(id)
    console.log(ctx)
    // const dpr = my.getSystemInfoSync().pixelRatio
    const dpr = 1
    const canvas = new ChartCanvas(ctx, `#${id}`, false)

    my.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res: my.SelectorResult) => {
        console.log(res)
        const boundingClient = res[0] as my.IBoundingClientRect
        const { width, height } = boundingClient
        // initChart(canvas, width, height, dpr)
      })
  }

  useNativeEffect(() => {
    init()
  }, [])

  // useEffect(() => {
  //   updateOption(option)
  // }, [option, updateOption])

  return <AliCanvas id={id} style={{ width: '100vw', height: '30vh' }} {...props} />
}

export default Chart
