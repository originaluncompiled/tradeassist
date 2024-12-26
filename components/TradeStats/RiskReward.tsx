import { View, Text } from 'react-native'
import React from 'react'

const RiskReward = () => {
  return (
    <View className='mx-4 my-2 flex-1 rounded-2xl px-4 pb-4 pt-3 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Risk/Reward</Text>

      <View className='flex-1 flex-row justify-between'>
        <View className='flex-1 items-start'>
          <Text className='font-medium text-lg text-dark-2'>Average</Text>
          <Text className='font-medium text-2xl text-dark-1 px-4 py-2 bg-dark-6 rounded-full mt-2'>1 : 2.14</Text>
        </View>

        <View className='justify-center pr-4'>
          <Text className='font-medium text-lg text-dark-2'>Highest <Text className='text-dark-1'>1: 5.42</Text></Text>
          <Text className='font-medium text-lg text-dark-2'>Lowest <Text className='text-dark-1'>1: 0.98</Text></Text>
        </View>
      </View>
    </View>
  )
}

export default RiskReward