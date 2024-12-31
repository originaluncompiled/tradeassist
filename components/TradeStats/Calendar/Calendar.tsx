import { View, Text, Pressable } from 'react-native'
import { CalendarProps } from '@/constants/types'
import { useEffect, useState } from 'react'

const Calendar = ({ calendarData, updateCalendarModal, updateSelectedDate }: CalendarProps) => {
  const [monthInfo, setMonthInfo] = useState({ firstDayOfMonth: 0, monthLength: 0, lastDayOfMonth: 0 });
  const [calendarLayout, setCalendarLayout] = useState<('empty' | number)[][]>([]);

  const getMonthInfo = (date: Date) => {
    const formattedDate = new Date(date);
    
    // returns 1-31, because it's used as a 'counter' for how many days to display on the calendar
    const daysInMonth = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 1, 0).getDate();
    // returns 0-6 because it's used as an index later (sunday to saturday)
    const firstDayOfMonth = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 1).getDay();
    const lastDayOfMonth = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), daysInMonth).getDay();
    
    setMonthInfo({ monthLength: daysInMonth, firstDayOfMonth: firstDayOfMonth, lastDayOfMonth: lastDayOfMonth });
  };

  useEffect(() => {
    // on first load, calendarData is empty, which causes all kinds of not fun things
    if (calendarData.length > 0) {
      getMonthInfo(new Date(calendarData[0].date));
      createCalendarLayoutArray();
    };
  }, [calendarData])

  const createCalendarLayoutArray = () => {
    const emptyStartingDays = 6 - (6 - monthInfo.firstDayOfMonth);
    const emptyEndingDays = 6 - monthInfo.lastDayOfMonth;

    const amountOfWeeks = Math.ceil((emptyStartingDays + monthInfo.monthLength + emptyEndingDays) / 7);

    const calendarArray: ('empty' | number)[][] = Array.from({ length: amountOfWeeks }).map((_, weekIndex) => {
      return Array.from({ length: 7 }).map((_, dayIndex) => {
        const currentDay = dayIndex + 1 + (weekIndex * 7);

        if (currentDay < emptyStartingDays || currentDay > emptyStartingDays + monthInfo.monthLength) {
          return 'empty';
        } else {
          return currentDay;
        }
      });
    });

    // an array (month) containing arrays (weeks) containing 'empty' or numbers (days)
    setCalendarLayout(calendarArray);
  }

  return (
    <View>
      <View className='flex-1 flex-row'>
        {Array.from({ length: 7 }).map((_, index) => {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return (
            <View className='flex-1 items-center justify-center px-2 mt-2' key={index}>
              <Text className='text-dark-4 font-semibold text-center'>{days[index]}</Text>
            </View>
          )
        })}
      </View>

      {calendarLayout.map((weekArray, weekIndex) => (
        <View className='flex-1 flex-row' key={weekIndex}>

        {weekArray.map((day, dayIndex) => {
          // we subtract the 'empty' days at the start/end of the month
          // add 1 so that it counts from 1
          const currentDay = (dayIndex + (weekIndex * 7)) - (6 - (6 - monthInfo.firstDayOfMonth)) + 1;

          if (day === 'empty') {
            return (
              <View
                key={dayIndex}
                className={`
                  flex-1 items-center justify-center border border-dark-6 rounded-lg px-2 py-2 mt-2
                  ${dayIndex !== (6 - monthInfo.firstDayOfMonth) && 'mr-1'}
                `}
              />
            )
          } else {
            return (
              <Pressable
                key={dayIndex}
                className={`
                  flex-1 items-center justify-center mt-2 rounded-lg px-2 py-2
                  ${dayIndex !== 6 && 'mr-1'} 
                  ${calendarData[calendarData.findIndex(day => new Date(day.date).getDate() === currentDay)]?.outcome === 'WIN' ? 'active:bg-accent-green bg-accent-green/50 border-accent-green border'
                    : (calendarData[calendarData.findIndex(day => new Date(day.date).getDate() === currentDay)]?.outcome === 'LOSS' ? 'active:bg-accent-red bg-accent-red/50 border-accent-red border'
                      : (calendarData[calendarData.findIndex(day => new Date(day.date).getDate() === currentDay)]?.outcome === 'BREAK EVEN' ? 'active:bg-dark-5 bg-dark-5/50 border border-dark-5' : 'bg-dark-6/50 border border-dark-6'))
                  }
                  ${currentDay === new Date().getDate() && 'border-2 border-green-2'}
                `}
                onPress={() => {
                  if (calendarData[calendarData.findIndex(day => new Date(day.date).getDate() === currentDay)] === undefined) return;

                  updateSelectedDate(new Date(new Date(calendarData[0].date).setHours(0, 0, 0, 0)));
                  updateCalendarModal(true);
                }}
              >
                <Text className='text-dark-1 font-semibold text-center'>{day}</Text>
              </Pressable>
            )
          }
        })}
        
        </View>
      ))}
    </View>
  )
}

export default Calendar