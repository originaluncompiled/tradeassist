import { View, Text, TextInput } from 'react-native'
import { colors } from '@/constants/colors'
import { InputChangeAsProp } from '@/constants/types'
import { useState } from 'react'

const TradeReturn = ({ tradeState, handleInputChange }: InputChangeAsProp) => {
  const [value, setValue] = useState('');

  return (
    <View className='flex-row items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>Amount Made/Lost</Text>
      <TextInput
        placeholder='$0.00'
        placeholderTextColor={colors.dark.neutral_3}
        inputMode='numeric'
        onChangeText={text => {
          // regex to remove any formatting, so that you don't get 'NaN' when changing values
          handleInputChange(Number(text.replace(/[^0-9.-]+/g, '')), 'TRADE_RETURN');
          setValue(text);
        }}
        onEndEditing={() => {
          if (value === '') {
            return; // just want to leave the input empty when nothing's been inputted
          }
          // regex to remove any formatting, so when formatting it again, it doesn't try to convert '$' and stuff to numbers and give NaN
          const unformattedValue = value.replace(/[^0-9.-]+/g, '');
          setValue(Number(unformattedValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'}))
        }}
        value={value}
        className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-12'
        textAlign='center'
      />
    </View>
  )
}

export default TradeReturn