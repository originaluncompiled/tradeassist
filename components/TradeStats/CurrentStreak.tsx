import { View, Text } from 'react-native'
import React from 'react'

const CurrentStreak = () => {
  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Current Streak</Text>

      <View className='flex-row flex-wrap justify-between'>
        <View>
          <Text className='font-medium text-lg text-dark-2'>Days</Text>
          <View className='flex-row items-center justify-center'>
            <View className='flex'>
              <Text className='font-semibold text-3xl text-dark-1 px-4 py-2 border-4 border-accent-red rounded-full mt-2 text-center'>2</Text>
            </View>

            <View className='ml-2'>
              <Text className='font-medium text-dark-1 px-3 py-1 mb-2 border border-accent-red bg-accent-red/60 rounded-2xl text-center'>2 Days</Text>
              <Text className='font-medium text-dark-1 px-3 py-1 border border-accent-green bg-accent-green/60 rounded-2xl text-center'>5 Days</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className='font-medium text-lg text-dark-2'>Trades</Text>
          <View className='flex-row items-center justify-center'>
            <View className='flex'>
              <Text className='font-semibold text-3xl text-dark-1 px-4 py-2 border-4 border-accent-red rounded-full mt-2 text-center'>3</Text>
            </View>
            
            <View className='ml-2'>
              <Text className='font-medium text-dark-1 px-3 py-1 mb-2 border border-accent-red bg-accent-red/60 rounded-2xl text-center'>3 Trades</Text>
              <Text className='font-medium text-dark-1 px-3 py-1 border border-accent-green bg-accent-green/60 rounded-2xl text-center'>12 Trades</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CurrentStreak