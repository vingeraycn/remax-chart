import * as React from 'react'
import { View } from 'remax/one'
import RemaxChart from '../../../src/index'
import { MOCK_OPTION } from '../../../src/config'

const Index = (): JSX.Element => {
  return (
    <View>
      <RemaxChart option={MOCK_OPTION as any} height="30vh" />
    </View>
  )
}

export default Index
