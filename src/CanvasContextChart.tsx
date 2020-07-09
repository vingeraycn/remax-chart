import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNativeEffect } from 'remax'
import { Canvas as AliCanvas } from 'remax/ali'
// @ts-ignore
import * as echarts from './echarts.min'
import { EChartOption } from 'echarts'
import ChartCanvas from './ChartCanvas'
import { getMiniAppApiObj } from '@/utils'

interface ChartProps {
  option: EChartOption
  width?: string
  height?: string
  onUpdated?: () => void
  onCreated?: () => void
  onDispose?: () => void
}

const CanvasContextChart = ({
  option,
  onCreated,
  onUpdated,
  onDispose,
  width = '100vw',
  height = '30vh',
  ...props
}: ChartProps): JSX.Element => {
  const [size, setSize] = useState({
    width,
    height,
  })
  const ref = useRef<echarts.ECharts>()
  const id = useMemo(() => `chart_${Math.random().toFixed(3).replace('.', '_')}`, [])

  const updateOption = useCallback((option: EChartOption) => {
    const chart = ref.current

    if (!chart || !option) {
      return
    }
    chart.setOption(option, { notMerge: true })
    onUpdated?.()
  }, [])

  const initChart = useCallback(function (canvas: any, width: number, height: number, dpr: number) {
    echarts.setCanvasCreator(() => canvas)
    const chart = echarts.init(canvas, undefined, {
      width,
      height,
      devicePixelRatio: dpr, // 像素
    })

    canvas.setChart(chart)
    onCreated?.()
    ref.current = chart
    updateOption(option)

    return chart
  }, [])

  const init = () => {
    const miniAppApi = getMiniAppApiObj()
    const ctx = miniAppApi.createCanvasContext(id)
    const dpr = miniAppApi.getSystemInfoSync().pixelRatio ?? 2
    const canvas = new ChartCanvas(ctx, `#${id}`, false)

    miniAppApi
      .createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res: any) => {
        const boundingClient = res[0] as my.IBoundingClientRect
        const { width, height } = boundingClient

        setSize({
          width: `${dpr * width}px`,
          height: `${dpr * height}px`,
        })

        ctx.scale(dpr, dpr)
        initChart(canvas, width, height, dpr)
      })
  }

  useNativeEffect(() => {
    init()
    return () => {
      const chart = ref.current
      if (!chart) {
        return
      }

      chart.dispose()
      ref.current = null
      onDispose?.()
    }
  }, [])

  useEffect(() => {
    updateOption(option)
  }, [option, updateOption])

  return <AliCanvas id={id} width={size.width} height={size.height} style={size} {...props} />
}

export default CanvasContextChart
