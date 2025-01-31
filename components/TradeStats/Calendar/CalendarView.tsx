import { View, Text } from 'react-native'
import CalendarModal from './CalendarModal'
import { useEffect, useMemo, useState } from 'react'
import { CalendarViewProps } from '@/constants/types'
import Calendar from './Calendar'
import { TradeDataByDay, useStats } from '@/hooks/useStats'
import { useUserSettings } from '@/hooks/useUserSettings'

const CalendarView = ({ tradeData }: CalendarViewProps) => {
  const { locale } = useUserSettings();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateSelectedDate = (date: Date) => setSelectedDate(new Date(date.setHours(0, 0, 0, 0)));
  
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const updateShowCalendarModal = (value: boolean) => setShowCalendarModal(value);
  
  const { tradeDataByDay } = useStats();
  const [calendarData, setCalendarData] = useState<TradeDataByDay>([]);

  const filteredTradeData = useMemo(() => {
    return tradeDataByDay.map((trade) => {
      // if it's from a different month, then we don't need that trade
      if (new Date(trade.date).getMonth() !== new Date().getMonth()) return;

      // if it's from a different year, then we don't need that trade
      if (new Date(trade.date).getFullYear() !== new Date().getFullYear()) return;

      return trade;
    }).filter((trade) => trade !== undefined);
  }, [tradeDataByDay]);

  useEffect(() => {
    setCalendarData(filteredTradeData);
  }, [tradeDataByDay]);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      {showCalendarModal &&
        <CalendarModal
          showModal={showCalendarModal}
          updateShowModal={updateShowCalendarModal}
          selectedDate={selectedDate}
          calendarData={calendarData}
          tradeData={tradeData.filter((trade) => new Date(trade.date).getMonth() === new Date().getMonth())}
        />
      }
      <Text className='font-bold text-xl text-dark-2'>Trade Calendar - {new Date(new Date().getTime()).toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</Text>

      <Calendar
        calendarData={calendarData}
        updateCalendarModal={updateShowCalendarModal}
        updateSelectedDate={updateSelectedDate}
      />

      <View className='flex-1'>
        <View className='flex-row justify-between mt-1'>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>
            {calendarData?.filter(day => day.outcome === 'WIN').length
          }</Text> Winning Days</Text>
          <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>
            {calendarData?.filter(day => day.outcome === 'BREAK EVEN').length}
          </Text> Break Even Days</Text>
        </View>
        <Text className='text-dark-2'><Text className='text-dark-1 font-semibold text-lg'>
          {calendarData?.filter(day => day.outcome === 'LOSS').length}
        </Text> Losing Days</Text>
      </View>
    </View>
  )
}

export default CalendarView