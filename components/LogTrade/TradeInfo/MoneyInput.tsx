import { View, Text, TextInput } from 'react-native'
import { useState } from 'react'
import { colors } from '@/constants/colors'
import { MoneyInputProps } from '@/constants/types'

const MoneyInput = ({ text, handleInputChange, dispatchAction }: MoneyInputProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <View className='flex-row items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>{text}</Text>
      <TextInput
        placeholder='$0.00'
        placeholderTextColor={colors.dark.neutral_3}
        inputMode='numeric'
        onChangeText={input => {
          setValue(input);
        }}
        onEndEditing={() => {
          if (value === '') {
            return; // just want to leave the input empty when nothing's been inputted
          }
          // regex to remove any formatting, so when formatting it again, it doesn't try to convert '$' and stuff to numbers and give NaN
          let unformattedValue = value.replace(/[^0-9.-]+/g, '');

          handleInputChange(Number(unformattedValue), dispatchAction);
          setValue(Number(unformattedValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
        }}
        value={value}
        className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-12'
        textAlign='center'
      />
    </View>
  )
}

export default MoneyInput