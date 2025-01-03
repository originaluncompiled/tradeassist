import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { colors } from '@/constants/colors'
import { useUserSettings } from '@/hooks/useUserSettings'

const Layout = () => {
  const { market } = useUserSettings();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.dark.neutral_8,
        },
        headerTintColor: colors.dark.neutral_2,
        headerShadowVisible: false,
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name='editassets'
        options={{
          title: `Edit ${market === 'Forex' ? 'Pairs'
          : market === 'Futures' ? 'Contracts'
          : market === 'Crypto' ? 'Coins'
          : 'Stocks'}`,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              className='rounded-lg px-2'
              onPressOut={() => setTimeout(() => {router.dismiss()}, 50)}
              hitSlop={12}
            >
              <Text className='text-lg font-semibold text-dark-3'>Cancel</Text>
            </Pressable>
          )
        }}
      />
    </Stack>
  )
}

export default Layout