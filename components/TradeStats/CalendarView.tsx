import { View, Text } from 'react-native'
import CalendarModal from './CalendarModal'
import { useEffect, useState } from 'react'
import { Trade, CalendarViewProps } from '@/constants/types'
import Calendar from './Calendar'

const CalendarView = ({ tradeData }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateSelectedDate = (date: Date) => setSelectedDate(date);
  
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const updateShowCalendarModal = (value: boolean) => setShowCalendarModal(value);

  const [calendarData, setCalendarData] = useState<{date: Date, totalReturn: number, outcome: 'WIN' | 'LOSS' | 'BREAK EVEN', trades: Trade[]}[]>([]);

  useEffect(() => {
    let calendarArray:{date: Date, totalReturn: number, outcome: 'WIN' | 'LOSS' | 'BREAK EVEN', trades: Trade[]}[] = [];
    tradeData.map((trade) => {
      // if it's from a different month, then we don't need that trade
      if (new Date(trade.date).getMonth() !== new Date().getMonth()) return;
      // if the date already exists, add the trade to it, otherwise add a new object for that day
      if (calendarArray.find((day) => new Date(day.date.setHours(0, 0, 0, 0)).getTime() === new Date(trade.date).getTime())) {
        calendarArray[calendarArray.findIndex((day) => new Date(day.date.setHours(0, 0, 0, 0)).getTime() === new Date(trade.date).getTime())].trades.push(trade);
      } else {
        calendarArray.push({ date: new Date(trade.date), totalReturn: 0, outcome: 'BREAK EVEN', trades: [trade] });
      }
    })

    calendarArray.map((day) => {
      day.trades.map((trade) => {
        day.totalReturn += trade.tradeReturn;
      })

      if (day.totalReturn > 0) {
        day.outcome = 'WIN';
      } else if (day.totalReturn < 0) {
        day.outcome = 'LOSS';
      }
    })

    setCalendarData(calendarArray.reverse());
  }, [tradeData]);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      {<CalendarModal
        showModal={showCalendarModal}
        updateShowModal={updateShowCalendarModal}
        selectedDate={selectedDate}
        calendarData={calendarData}
        tradeData={tradeData.filter((trade) => new Date(trade.date).getMonth() === new Date().getMonth())}
      />}
      {/* TO-DO: Have ability to switch between months (using filters???) */}
      <Text className='font-bold text-xl text-dark-2'>Trade Calendar - {new Date(new Date().getFullYear(), new Date().getMonth()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>

      <Calendar
        calendarData={calendarData}
        updateCalendarModal={updateShowCalendarModal}
        updateSelectedDate={updateSelectedDate}
      />

      <View className='flex-1'>
        <View className='flex-row justify-between mt-1'>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>{calendarData?.filter(day => day.outcome === 'WIN').length}</Text> Winning Days</Text>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>{calendarData?.filter(day => day.outcome === 'BREAK EVEN').length}</Text> Break Even Days</Text>
        </View>
        <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>{calendarData?.filter(day => day.outcome === 'LOSS').length}</Text> Losing Days</Text>
      </View>
    </View>
  )
}

export default CalendarView