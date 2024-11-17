import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const LogTrade = () => {
  return (
    <View className='flex-1 bg-dark-8 p-4'>
      
      <Pressable
        className='rounded-lg bg-green-2/75 active:bg-green-2 border border-green-2'
        onPress={() => {
          router.navigate('/(tabs)/tradehistory')
        }}
      >
        <Text className='text-lg text-dark-7 font-bold text-center p-3'>Log Trade</Text>
      </Pressable>
    </View>
  )
}

export default LogTrade