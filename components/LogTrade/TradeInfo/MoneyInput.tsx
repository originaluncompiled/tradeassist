import { View, Text, TextInput, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { colors } from '@/constants/colors'
import { MoneyInputProps } from '@/constants/types'

const MoneyInput = ({ text, handleInputChange, dispatchAction, initialValue }: MoneyInputProps) => {
  const [value, setValue] = useState<string>(`${initialValue}`);
  useEffect(() => {
    handleEndEditing();
  }, [])

  const handleEndEditing = () => {
    if (value === '') {
      return; // just want to leave the input empty when nothing's been inputted
    }
    // regex to remove any formatting, so when formatting it again, it doesn't try to convert '$' and stuff to numbers and give NaN
    let unformattedValue = value.replace(/[^0-9.-]+/g, '');

    handleInputChange(Number(unformattedValue), dispatchAction);
    setValue(Number(unformattedValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
  }

  return (
    <View className='flex-row items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>{text}</Text>
      <TextInput
        placeholder='$0.00'
        placeholderTextColor={colors.dark.neutral_3}
        selectionColor={`${colors.green_2}B4`}
        inputMode='numeric'
        value={value}
        multiline={Platform.OS === "ios" ? false : true} // for some reason fixes the placeholder dissapearing on Android when swiping
        scrollEnabled={false}
        onChangeText={input => {
          setValue(input);
        }}
        onEndEditing={() => handleEndEditing()}
        className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-14'
        textAlign='center'
      />
    </View>
  )
}

export default MoneyInput