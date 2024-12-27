import { View, Text, Modal, Pressable } from 'react-native'
import { CalendarModalProps, Trade } from '@/constants/types'
import Separator from '../Separator'
import TradeCard from '../TradingHistory/TradeCard'
import { ScrollView } from 'react-native-gesture-handler'

const CalendarModal = ({showModal, updateShowModal, selectedDate}: CalendarModalProps) => {
  const placeholderTrades: Trade[] = [
    {
      id: 1,
      date: '2022-01-01',
      asset: 'BTC',
      rating: 2,
      tradeReturn: 200,
      balanceChange: 1,
      direction: 'Long',
    },
    {
      id: 2,
      date: '2022-01-01',
      asset: 'AAPL',
      rating: 4,
      tradeReturn: -500,
      balanceChange: -2.5,
      direction: 'Short',
    }
  ]
  
  return (
    <Modal visible={showModal} onRequestClose={() => updateShowModal(false)} animationType='fade' transparent>
      <View className='flex-1 justify-center items-center'>
        <Pressable className='absolute w-full h-full bg-dark-8/50' onPress={() => updateShowModal(false)}/>

        <View className='px-4 pb-4 pt-2 bg-dark-7 border border-dark-6 rounded-2xl w-4/5'>
          <Text className='text-dark-1 font-medium text-xl mb-2 text-center'>Trading Day: {selectedDate.toLocaleDateString()}</Text>

          <ScrollView className='max-h-[400]' showsVerticalScrollIndicator={false}>
            <Text className='text-dark-2 font-medium text-lg'>PnL: <Text className='text-dark-1 font-semibold'>$501.43</Text></Text>
            <Text className='text-dark-2 font-medium text-lg'>Win Rate: <Text className='text-dark-1 font-semibold'>66.67%</Text></Text>
            <Text className='text-dark-2 font-medium text-lg mb-2'>Trades Taken: <Text className='text-dark-1 font-semibold'>3</Text></Text>

            <Separator margin='mb-4'/>

            <TradeCard tradeInfo={placeholderTrades[0]} lightBg />
            <TradeCard tradeInfo={placeholderTrades[1]} lightBg />
            <TradeCard tradeInfo={placeholderTrades[0]} lightBg />
          </ScrollView>
          <Pressable
            className='px-2 py-1 border border-dark-5 bg-dark-6 active:bg-dark-3/60 rounded-lg'
            onPress={() => updateShowModal(false)}
          >
            <Text className='text-lg font-medium text-dark-3 text-center'>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default CalendarModal