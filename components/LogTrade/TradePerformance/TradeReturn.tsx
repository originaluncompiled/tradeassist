import { View, Text, TextInput, Platform } from 'react-native'
import { colors } from '@/constants/colors'
import { InputChangeAsProp } from '@/constants/types'
import { useEffect, useState } from 'react'
import { useUserSettings } from '@/hooks/useUserSettings'

const TradeReturn = ({ tradeState, handleInputChange }: InputChangeAsProp) => {
  const { currency } = useUserSettings();

  const [value, setValue] = useState(tradeState.tradeReturn.toString());
  useEffect(() => {
    handleEndEditing();
  }, [])

  const handleEndEditing = () => {
    if (value === '') {
      return; // just want to leave the input empty when nothing's been inputted
    }
    // regex to remove any formatting, so when formatting it again, it doesn't try to convert '$' and stuff to numbers and give NaN
    const unformattedValue = value.replace(/[^0-9.-]+/g, '');
    setValue(Number(unformattedValue).toLocaleString('en-US', {style: 'currency', currency: currency}));
  }

  const handleChangeText = (text: string) => {
    // regex to remove any formatting, so that you don't get 'NaN' when changing values
    handleInputChange(Number(text.replace(/[^0-9.-]+/g, '')), 'TRADE_RETURN');
    setValue(text);
  }

  return (
    <View className='flex-row items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>Amount Made/Lost</Text>
      <TextInput
        placeholder='$0.00'
        placeholderTextColor={colors.dark.neutral_3}
        selectionColor={`${colors.green_2}B4`}
        inputMode='numeric'
        multiline={Platform.OS === "ios" ? false : true} // for some reason fixes the placeholder dissapearing on Android when swiping
        scrollEnabled={false}
        onChangeText={text => handleChangeText(text)}
        onEndEditing={() => handleEndEditing()}
        value={value}
        className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-14'
        textAlign='center'
      />
    </View>
  )
}

export default TradeReturn