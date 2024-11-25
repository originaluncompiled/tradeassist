import { Text, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const LogTradeButton = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={{ flex: 1 }}
    >
      <Pressable
        className='rounded-lg mb-4 mt-2 bg-green-2/75 active:bg-green-2 border border-green-2'
        onPress={() => {
          router.navigate('/(tabs)/tradehistory')
        }}
      >
        <Text className='text-lg text-dark-7 font-bold text-center p-3'>Log Trade</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default LogTradeButton