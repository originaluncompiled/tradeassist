import { View, Text } from 'react-native'
import CalendarModal from './CalendarModal'
import { useState } from 'react'
import { CalendarViewProps } from '@/constants/types'
import Calendar from './Calendar'
import { useStats } from '@/hooks/useStats'

const CalendarView = ({ tradeData }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateSelectedDate = (date: Date) => setSelectedDate(new Date(date.setHours(0, 0, 0, 0)));
  
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const updateShowCalendarModal = (value: boolean) => setShowCalendarModal(value);
  
  const { tradeDataByDay } = useStats();

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      {<CalendarModal
        showModal={showCalendarModal}
        updateShowModal={updateShowCalendarModal}
        selectedDate={selectedDate}
        calendarData={tradeDataByDay}
        tradeData={tradeData.filter((trade) => new Date(trade.date).getMonth() === new Date().getMonth())}
      />}
      {/* TO-DO: Have ability to switch between months (using filters???) */}
      <Text className='font-bold text-xl text-dark-2'>Trade Calendar - {new Date(new Date().getTime()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>

      <Calendar
        calendarData={tradeDataByDay}
        updateCalendarModal={updateShowCalendarModal}
        updateSelectedDate={updateSelectedDate}
      />

      <View className='flex-1'>
        <View className='flex-row justify-between mt-1'>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>{tradeDataByDay?.filter(day => day.outcome === 'WIN').length}</Text> Winning Days</Text>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>{tradeDataByDay?.filter(day => day.outcome === 'BREAK EVEN').length}</Text> Break Even Days</Text>
        </View>
        <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>{tradeDataByDay?.filter(day => day.outcome === 'LOSS').length}</Text> Losing Days</Text>
      </View>
    </View>
  )
}

export default CalendarView