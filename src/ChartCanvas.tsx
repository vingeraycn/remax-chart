import * as echarts from 'echarts'

export default class ChartCanvas {
  private ctx: any

  private canvasId: string

  private chart: echarts.ECharts | null

  private canvasNode: any

  private event: Record<string, any> = {}

  constructor(ctx: any, canvasId: string, isNew: boolean, canvasNode: any) {
    this.ctx = ctx
    this.canvasId = canvasId
    this.chart = null
    if (isNew) {
      this.canvasNode = canvasNode
    } else {
      this.initStyle(ctx)
    }

    this.initEvent()
  }

  getContext(contextType: string) {
    if (contextType === '2d') {
      return this.ctx
    }
  }

  setChart(chart: echarts.ECharts) {
    this.chart = chart
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  initCanvas(zrender: any, ctx: any) {
    zrender.util.getContext = function () {
      return ctx
    }

    zrender.util.$override('measureText', function (text: string, font: string) {
      ctx.font = font || '12px sans-serif'
      return ctx.measureText(text)
    })
  }

  initStyle(ctx: any) {
    const styles = [
      'fillStyle',
      'strokeStyle',
      'globalAlpha',
      'textAlign',
      'textBaseAlign',
      'shadow',
      'lineWidth',
      'lineCap',
      'lineJoin',
      'lineDash',
      'miterLimit',
      'fontSize',
    ]

    styles.forEach((style) => {
      Object.defineProperty(ctx, style, {
        set: (value) => {
          if (
            (style !== 'fillStyle' && style !== 'strokeStyle') ||
            (value !== 'none' && value !== null)
          ) {
            ctx[`set${style.charAt(0).toUpperCase()}${style.slice(1)}`](value)
          }
        },
      })
    })

    ctx.createRadialGradient = ctx.createCircularGradient
  }

  initEvent() {
    this.event = {}
    const eventNames = [
      {
        wxName: 'touchStart',
        ecName: 'mousedown',
      },
      {
        wxName: 'touchMove',
        ecName: 'mousemove',
      },
      {
        wxName: 'touchEnd',
        ecName: 'mouseup',
      },
      {
        wxName: 'touchEnd',
        ecName: 'click',
      },
    ]

    eventNames.forEach((name) => {
      this.event[name.wxName] = (e: any) => {
        const touch = e.touches[0]
        this.chart?.getZr?.().handler.dispatch(name.ecName, {
          zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
          zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
        })
      }
    })
  }

  set width(w) {
    if (this.canvasNode) this.canvasNode.width = w
  }

  get width() {
    if (this.canvasNode) return this.canvasNode.width
    return 0
  }

  set height(h) {
    if (this.canvasNode) this.canvasNode.height = h
  }

  get height() {
    if (this.canvasNode) return this.canvasNode.height
    return 0
  }
}
