import { View } from 'react-native'
import React from 'react'

type SeparatorProps = {
  margin?: string,
  color?: string,
}

const Separator = ({ margin, color }: SeparatorProps) => {
  return (
    <View className={`border rounded-sm border-dark-4/10 ${margin} ${color}`} />
  )
}

export default Separator