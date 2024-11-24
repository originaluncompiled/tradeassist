import { View } from 'react-native'
import React from 'react'

type SeparatorProps = {
  margin?: string
}

const Separator = ({ margin }: SeparatorProps) => {
  return (
    <View className={`border rounded-sm border-dark-4/10 ${margin}`} />
  )
}

export default Separator