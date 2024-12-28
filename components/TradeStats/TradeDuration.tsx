import { View, Text } from 'react-native'
import React from 'react'
import { TradeData } from '@/constants/types'

const TradeDuration = ({ tradeData }: TradeData) => {
  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Trade Duration</Text>

      <View className='flex-1 flex-row justify-between'>
        <View className='flex-1 items-start'>
          <Text className='font-medium text-lg text-dark-2'>Average</Text>
          <Text className='font-medium text-xl text-dark-1 px-5 py-3 bg-dark-6 rounded-full mt-2'>1hr 12mins</Text>
        </View>

        <View className='justify-center pr-4'>
          <Text className='font-medium text-lg text-dark-2'>Shortest <Text className='text-dark-1'>24mins</Text></Text>
          <Text className='font-medium text-lg text-dark-2'>Longest <Text className='text-dark-1'>7hrs</Text></Text>
        </View>
      </View>
    </View>
  )
}

export default TradeDuration