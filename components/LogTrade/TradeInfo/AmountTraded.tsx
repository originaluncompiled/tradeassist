import { View, Text, TextInput, Platform } from 'react-native'
import { colors } from '@/constants/colors'
import { AmountTradedProps } from '@/constants/types'
import { useState } from 'react';

const AmountTraded = ({ handleInputChange, tradeState }: AmountTradedProps) => {
  const [value, setValue] = useState<string>(`${tradeState.amountTraded}`);

  return (
    <View className='flex-row items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>Amount Traded</Text>
      <TextInput
        placeholder='0'
        placeholderTextColor={colors.dark.neutral_3}
        inputMode='decimal'
        multiline={Platform.OS === "ios" ? false : true} // for some reason fixes the placeholder dissapearing on Android when swiping
        scrollEnabled={false}
        value={value}
        onChangeText={text => {
          setValue(text);
          handleInputChange(Number(text), 'AMOUNT_TRADED')
        }}
        className='text-dark-1 font-bold text-lg border-b border-dark-3 px-2 w-32 h-14'
        textAlign='center'
      />
    </View>
  )
}

export default AmountTraded