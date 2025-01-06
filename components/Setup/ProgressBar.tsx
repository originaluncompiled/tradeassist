import { Text, View } from 'react-native'
import React from 'react'
import { ProgressBarProps } from '@/constants/types'

const ProgressBar = ({ setupProgress }: ProgressBarProps) => {
  return (
    <View className='mb-4'>
      <View className='bg-dark-6 rounded-full h-4'>
        <View className={`bg-green-2 h-4 rounded-full ${setupProgress === 1 ? 'w-[52%]' : 'w-full'}`} />
      </View>
      <Text className='text-dark-3 text-lg font-bold'>{setupProgress} / 2</Text>
    </View>
  )
}

export default ProgressBar