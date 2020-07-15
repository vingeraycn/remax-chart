export const getPlatform = () => {
  const platform = process.env.REMAX_PLATFORM

  return {
    isWeChat: platform === 'wechat',
    isAli: platform === 'ali',
    isTouTiao: platform === 'toutiao',
  }
}

export const getMiniAppApiObj = (): any | undefined => {
  const { isAli, isTouTiao, isWeChat } = getPlatform()

  switch (true) {
    case isWeChat:
      return wx
    case isAli:
      return my
    case isTouTiao:
      return tt
    default:
      return undefined
  }
}
