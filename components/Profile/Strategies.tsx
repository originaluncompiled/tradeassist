import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import Button from '../Button'

const Strategies = () => {
  return (
    <View className='m-2'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-medium text-lg'>Strategies</Text>

        <Pressable hitSlop={12} onPress={() => console.log('add strategy')}>
          <MaterialCommunityIcons name='plus' size={24} color={colors.dark.neutral_1} />
        </Pressable>
      </View>

      <Button
        text="Quick 'n Easy"
        type='large'
        icon='chess-knight' buttonAction={() => {
        console.log('open strategy editor')
      }}/>
      <Button
        text='Trading Transformation'
        type='large'
        icon='chess-knight' buttonAction={() => {
        console.log('open strategy editor')
      }}/>
    </View>
  )
}

export default Strategies