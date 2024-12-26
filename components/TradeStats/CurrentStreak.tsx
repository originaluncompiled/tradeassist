import { View, Text } from 'react-native'
import React from 'react'

const CurrentStreak = () => {
  return (
    <View className='mx-4 my-2 flex-1 rounded-2xl px-4 pb-4 pt-3 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Current Streak</Text>

      <View className='flex-row justify-between'>
        <View>
          <Text className='font-medium text-lg text-dark-2'>Days</Text>
          <View className='flex-row'>
            <View className='flex items-center justify-center'>
              <Text className='font-semibold text-3xl text-dark-1 px-4 py-2 bg-accent-red rounded-full mt-2'>2</Text>
            </View>

            <View className='ml-2 items-center'>
              <Text className='font-medium text-dark-1 px-3 py-1 mb-2 bg-accent-red rounded-2xl'>2 Days</Text>
              <Text className='font-medium text-dark-1 px-3 py-1 bg-accent-green rounded-2xl'>5 Days</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className='font-medium text-lg text-dark-2'>Trades</Text>
          <View className='flex-row'>
            <View className='flex items-center justify-center'>
              <Text className='font-semibold text-3xl text-dark-1 px-4 py-2 bg-accent-red rounded-full mt-2'>3</Text>
            </View>
            
            <View className='ml-2 items-center'>
              <Text className='font-medium text-dark-1 px-3 py-1 mb-2 bg-accent-red rounded-2xl'>3 Trades</Text>
              <Text className='font-medium text-dark-1 px-3 py-1 bg-accent-green rounded-2xl'>12 Trades</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CurrentStreak