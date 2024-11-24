import { View, Text } from 'react-native'
import Button from '@/components/Button'
import { InputChangeAsProp } from '@/constants/types'

const TradeDirection = ({ tradeState, handleInputChange }: InputChangeAsProp) => {
  return (
    <View className='flex-row mt-2 items-center justify-between'>
      <Text className='text-dark-2 font-semibold text-lg'>Direction</Text>
      <View className='flex-row'>
        <Button
          text='Long'
          buttonAction={() => handleInputChange('Long', 'DIRECTION')}
          customClasses={`mr-1 ${tradeState.direction === 'Long' ? 'bg-dark-5' : 'bg-dark-6'}`}
        />
        <Button
          text='Short'
          buttonAction={() => handleInputChange('Short', 'DIRECTION')}
          customClasses={`${tradeState.direction === 'Short' ? 'bg-dark-5' : 'bg-dark-6'}`}
        />
      </View>
    </View>
  )
}

export default TradeDirection