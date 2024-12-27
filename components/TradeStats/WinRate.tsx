import { View, Text } from 'react-native'
import React from 'react'

const WinRate = () => {
  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Win Rate</Text>

      <View className='flex-1 justify-between'>
        <View className='flex-1 flex-row items-center justify-between'>
          <Text className='font-semibold text-xl text-dark-1 px-5 py-3 bg-dark-6 rounded-full mt-2'>74%</Text>
          <Text className='font-semibold text-lg text-dark-1 pr-2'>2.4x Profit Factor</Text>
        </View>

        <View className='flex-row mt-2 items-start'>
          <Text className='font-medium text-dark-1 px-3 py-1 mr-2 border border-accent-red bg-accent-red/60 rounded-2xl'>3 Losses</Text>
          <Text className='font-medium text-dark-1 px-3 py-1 mr-2 border border-accent-green bg-accent-green/60 rounded-2xl'>12 Wins</Text>
          <Text className='font-medium text-dark-1 px-3 py-1 border border-dark-4 bg-dark-4/60 rounded-2xl'>2 Break Evens</Text>
        </View>
      </View>
    </View>
  )
}

export default WinRate