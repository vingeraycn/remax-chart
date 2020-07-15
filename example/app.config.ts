import { AppConfig as WechatAppConfig } from 'remax/wechat'
import { AppConfig as AliAppConfig } from 'remax/ali'
import { AppConfig as ToutiaoAppConfig } from 'remax/toutiao'
import { AppConfig as WebAppConfig } from 'remax/web'

const pages = ['pages/index/index']
const color = '#282c34'

export const wechat: WechatAppConfig = {
  pages,
  window: {
    navigationBarBackgroundColor: color,
    navigationBarTitleText: 'Remax One Wechat',
  },
}

export const ali: AliAppConfig = {
  pages,
  window: {
    defaultTitle: 'Remax One Ali',
    titleBarColor: color,
  },
}

export const toutiao: ToutiaoAppConfig = {
  pages,
  window: {
    navigationBarTitleText: 'Remax One Toutiao',
    navigationBarBackgroundColor: color,
  },
}

export const web: WebAppConfig = {
  // 页面默认标题
  title: '页面默认标题',
  // 配置的页面
  pages,
  // 是否全局开启下拉刷新
  pullToRefresh: false,
  // 触底滚动的默认距离，单位 px
  reachBottomOffset: 50,
  router: {
    // history 类型，支持 hash 和 browser
    type: 'browser',
  },
}
