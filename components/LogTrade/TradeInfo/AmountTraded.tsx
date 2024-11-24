import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/colors';
import { AmountTradedProps } from '@/constants/types';

const AmountTraded = ({ handleInputChange }: AmountTradedProps) => {
  return (
    <View className='flex-row items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>Amount Traded</Text>
      <TextInput
        placeholder='0'
        placeholderTextColor={colors.dark.neutral_3}
        inputMode='decimal'
        onChangeText={text => handleInputChange(Number(text), 'AMOUNT_TRADED')}
        className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-12'
        textAlign='center'
      />
    </View>
  )
}

export default AmountTraded