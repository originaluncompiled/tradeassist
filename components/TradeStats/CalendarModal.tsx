import { View, Text, Modal, Pressable } from 'react-native'
import { CalendarModalProps } from '@/constants/types'
import Separator from '../Separator'
import TradeCard from '../TradingHistory/TradeCard'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useRef, useState } from 'react'

const CalendarModal = ({showModal, updateShowModal, selectedDate, tradeData, calendarData}: CalendarModalProps) => {
  const [tradeIndex, setTradeIndex] = useState(-1);

  useEffect(() => {
    if (calendarData.length === 0) return;
    
    setTradeIndex(calendarData.findIndex((day) => day.date.getTime() === selectedDate.getTime()));
  }, [calendarData, selectedDate]);
  
  return (
    <Modal visible={showModal} onRequestClose={() => updateShowModal(false)} animationType='fade' transparent>
      <View className='flex-1 justify-center items-center'>
        <Pressable className='absolute w-full h-full bg-dark-8/50' onPress={() => updateShowModal(false)}/>

        <View className='px-4 pb-4 pt-2 bg-dark-7 border border-dark-6 rounded-2xl w-4/5'>
          <Text className='text-dark-1 font-medium text-xl mb-2 text-center'>Trading Day: {selectedDate.toLocaleDateString()}</Text>

          <ScrollView className='max-h-[400]' showsVerticalScrollIndicator={false}>
            {calendarData && tradeIndex !== -1 ?
              <View>
                <Text className='text-dark-2 font-medium text-lg'>PnL:&nbsp;
                  <Text className='text-dark-1 font-semibold'>
                    {calendarData[tradeIndex].totalReturn.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                    </Text>
                  </Text>
                <Text className='text-dark-2 font-medium text-lg'>
                  Win Rate:&nbsp;
                  <Text className='text-dark-1 font-semibold'>
                    {calendarData[tradeIndex].trades.reduce((total, trade) => total + (trade.tradeReturn > 0 ? 1 : 0), 0) / (calendarData[tradeIndex].trades.length / 100)}%
                  </Text>
                </Text>
                <Text className='text-dark-2 font-medium text-lg mb-2'>Trades Taken: <Text className='text-dark-1 font-semibold'>{calendarData[tradeIndex].trades.length}</Text></Text>
              </View>
                : <Text className='text-dark-3 text-lg font-semibold text-center my-2'>Couldn't Find Any Trades :(</Text>
            }
            <Separator margin='mb-4'/>

            {
              tradeData.map((trade, index: number) => {
                if (new Date(new Date(trade.date).setHours(0, 0, 0, 0)).getTime() === selectedDate.getTime()) {
                  return <TradeCard key={index} tradeInfo={trade} onClick={updateShowModal} onClickValue={false} lightBg />
                }
              })
            }
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