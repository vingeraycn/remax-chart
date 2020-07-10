import * as React from 'react'
import { ElementType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNativeEffect } from 'remax'
// @ts-ignore
import * as echarts from './echarts.min'
import { EChartOption } from 'echarts'
import ChartCanvas from './ChartCanvas'
import { getMiniAppApiObj } from '@/utils'

export enum BaseChartType {
  CANVAS_CONTEXT = 'CANVAS_CONTEXT',
  CANVAS_2D = 'CANVAS_2D',
}

interface BaseChartProps {
  option: EChartOption
  type?: BaseChartType
  container?: ElementType<any>
  theme?: string
  width?: string
  height?: string
  onUpdated?: () => void
  onCreated?: () => void
  onDispose?: () => void
}

const BaseChart = ({
  option,
  type,
  theme,
  onCreated,
  onUpdated,
  onDispose,
  width = '300px',
  height = '200px',
  container: Container = 'div',
  ...props
}: BaseChartProps): JSX.Element => {
  const canvasProps = Object.assign({}, type === BaseChartType.CANVAS_2D && { type: '2d' })
  const [size, setSize] = useState({
    width,
    height,
  })
  const containerRef = useRef<HTMLDivElement>(null)
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

  const initChart = useCallback(
    function (
      canvas: any,
      theme?: string,
      opt?: {
        width?: number
        height?: number
        devicePixelRatio?: number
      }
    ) {
      if (!canvas) {
        return null
      }
      const chart = echarts.init(canvas, theme, opt)

      canvas.setChart?.(chart)
      onCreated?.()
      ref.current = chart
      updateOption(option)

      return chart
    },
    [type]
  )

  const init = () => {
    const miniAppApi = getMiniAppApiObj()

    if (!miniAppApi) {
      initChart(containerRef.current)
      return
    }

    const dpr = miniAppApi.getSystemInfoSync().pixelRatio ?? 2
    const target = miniAppApi.createSelectorQuery().select(`#${id}`)

    if (!target) {
      return
    }
    if (type === BaseChartType.CANVAS_CONTEXT) {
      target.boundingClientRect().exec((res: any) => {
        const ctx = miniAppApi.createCanvasContext(id)
        const canvas = new ChartCanvas(ctx, `#${id}`, false)
        const { width, height } = res[0] as my.IBoundingClientRect

        setSize({
          width: `${dpr * width}px`,
          height: `${dpr * height}px`,
        })

        ctx.scale(dpr, dpr)
        echarts.setCanvasCreator(() => canvas)
        initChart(canvas, theme, {
          width,
          height,
          devicePixelRatio: dpr,
        })
      })
    } else if (type === BaseChartType.CANVAS_2D) {
      target.fields({ node: true, size: true }).exec(([{ node, width, height }]: any) => {
        const ctx = node.getContext('2d')
        const canvas = new ChartCanvas(ctx, `#${id}`, true, node)

        node.width = width * dpr
        node.height = height * dpr
        ctx.scale(dpr, dpr)
        echarts.setCanvasCreator(() => canvas)
        initChart(canvas, theme, {
          width,
          height,
          devicePixelRatio: dpr,
        })
      })
    }
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

  return (
    <Container
      ref={containerRef}
      id={id}
      width={size.width}
      height={size.height}
      style={size}
      {...canvasProps}
      {...props}
    />
  )
}

export default BaseChart
