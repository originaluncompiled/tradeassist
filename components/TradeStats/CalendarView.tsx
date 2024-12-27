import { View, Text, Pressable } from 'react-native'
import CalendarModal from './CalendarModal'
import { useState } from 'react'

type CalendarViewProps = {
  drawdown: number[]
}

const CalendarView = ({drawdown}: CalendarViewProps) => {
  const [showCalendarModal, setCalendarModal] = useState(false);
  const updateCalendarModal = (value: boolean) => setCalendarModal(value);

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      {<CalendarModal showModal={showCalendarModal} updateShowModal={updateCalendarModal} selectedDate={selectedDate}/>}

      <Text className='font-bold text-xl text-dark-2'>Trade Calendar - December 2024</Text>
      
      <View className='flex-1 my-2 rounded-2xl px-2 pb-2 bg-dark-6 border border-dark-5'>
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <View className='flex-row' key={rowIndex}>

            {Array.from({ length: 7 }).map((_, colIndex) => (
              <Pressable
                key={colIndex + ((rowIndex + 1) * 7)}
                className={`
                  flex-1 items-center justify-center mt-2 rounded-lg px-2 py-2
                  ${colIndex !== 6 && 'mr-1'} 
                  ${drawdown[colIndex + (rowIndex * 7)] > 0 ? 'active:bg-accent-green bg-accent-green/50 border-accent-green border'
                    : drawdown[colIndex + (rowIndex * 7)] < 0 ? 'active:bg-accent-red bg-accent-red/50 border-accent-red border'
                      : 'active:bg-dark-5/75 bg-dark-6 border border-dark-5/75'
                  }
                `}
                onPress={() => {
                  setCalendarModal(true);
                  setSelectedDate(new Date(2024, 11, colIndex + 1 + (rowIndex * 7)));
                }}
              >
                <Text className='text-dark-1 font-semibold text-center'>{colIndex + 1 + (rowIndex * 7)}</Text>
              </Pressable>
            )).map((item, index) => item)}

          </View>
        ))}
      </View>

      <View className='flex-1'>
        <View className='flex-row justify-between mt-1'>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold'>{drawdown.filter(day => day > 0).length}</Text> Winning Days</Text>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold'>{drawdown.filter(day => day === 0).length}</Text> Break Even Days</Text>
        </View>
        <Text className='text-dark-2'><Text className='text-dark-1 font-semibold'>{drawdown.filter(day => day < 0).length}</Text> Losing Days</Text>
      </View>
    </View>
  )
}

export default CalendarView