import * as React from 'react'
import { ElementType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNativeEffect } from 'remax'
// @ts-ignore
import * as echarts from './echarts'
import { EChartOption } from 'echarts'
import ChartCanvas from './ChartCanvas'
import { getMiniAppApiObj } from './utils'

export enum BaseChartType {
  CANVAS_CONTEXT = 'CANVAS_CONTEXT',
  CANVAS_2D = 'CANVAS_2D',
}

export interface BaseChartProps {
  option: EChartOption
  type?: BaseChartType
  container?: ElementType<any>
  theme?: string
  width?: string
  height?: string
  onUpdated?: () => void
  onCreated?: (chart: echarts.ECharts) => void
  onDispose?: () => void
}

function wrapTouch(event: any) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i]
    touch.offsetX = touch.x
    touch.offsetY = touch.y
  }
  return event
}

const BaseChart = ({
  option,
  type,
  theme,
  onCreated,
  onUpdated,
  onDispose,
  width = '100%',
  height = '100%',
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
      onCreated?.(chart)
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
        const canvas = new ChartCanvas(ctx, id, false)
        const { width, height } = res[0] as any

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
        const canvas = new ChartCanvas(ctx, id, true, node)

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

  const handleTouchStart = (e: any) => {
    const chart = ref.current
    if (chart && e.touches.length > 0) {
      const touch = e.touches[0]
      const handler = chart.getZr().handler
      handler.dispatch('mousedown', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'start')
    }
  }

  const handleTouchMove = (e: any) => {
    const chart = ref.current
    if (chart && e.touches.length > 0) {
      const touch = e.touches[0]
      const handler = chart.getZr().handler
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'change')
    }
  }

  const handleTouchEnd = (e: any) => {
    const chart = ref.current
    if (chart) {
      const touch = e.changedTouches ? e.changedTouches[0] : {}
      const handler = chart.getZr().handler
      handler.dispatch('mouseup', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.dispatch('click', {
        zrX: touch.x,
        zrY: touch.y,
      })
      handler.processGesture(wrapTouch(e), 'end')
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...canvasProps}
      {...props}
    />
  )
}

export default BaseChart
