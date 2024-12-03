import { View, Text, NativeSyntheticEvent, NativeScrollEvent, Pressable } from 'react-native'
import { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { ScrollerProps } from '@/constants/types'
import { useUserSettings } from '@/hooks/useUserSettings'

const Scroller = ({ initialTime, selectedDate, createTime, partOfDay, updatePartOfDay, timeObj }: ScrollerProps) => {
  const { is24Hour } = useUserSettings();

  const hoursArray = is24Hour ? ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'] : ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']

  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  // scroll to the initial time so that it's much more convenient to change the time slightly
  useEffect(() => {
    const hour = is24Hour ? new Date(initialTime).getHours() : new Date(initialTime).getHours() % 12;
    const minute = new Date(initialTime).getMinutes();
    
    hourRef.current?.scrollTo({ x: 0, y: hour * 80 });
    minuteRef.current?.scrollTo({ x: 0, y: minute * 80 });
    
    if (is24Hour) {
      createTime({ hours: hour, minutes: minute });
    } else {
      updatePartOfDay(new Date(initialTime).getHours() < 12 ? 'AM' : 'PM');
    }
  }, [initialTime])
  
  // Update the time right after the part of day gets switched, so that the time is correct, even without then updating the scroller
  useEffect(() => {
    if (is24Hour) return;
    // -1 means the time state hasn't been updated, which means the initialTime hasn't yet been saved/stored
    if (timeObj.hours === -1 && timeObj.minutes === -1) {
      createTime({
        hours: new Date(initialTime).getHours() % 12,
        minutes: new Date(initialTime).getMinutes()
      })
    } else {
      createTime(timeObj);
    }
  }, [partOfDay])

  // Update the time when the user changes the date, so that it doesn't require an update to the time, to update the date
  useEffect(() => {
    if (timeObj.hours === -1 && timeObj.minutes === -1) return;
    createTime(timeObj);
  }, [selectedDate])

  const handleHourScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    createTime({ hours: Math.round(e.nativeEvent.contentOffset.y / 80) })
  };
  const handleMinuteScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    createTime({ minutes: Math.round(e.nativeEvent.contentOffset.y / 80) })
  };

  return (
    <View className='flex-row justify-between items-center bg-green-2/75 border-2 border-green-2 rounded-lg h-24 mb-2'>
      <ScrollView
        ref={hourRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={80}
        decelerationRate='fast'
        onMomentumScrollEnd={(e) => handleHourScroll(e)}
      >
        {hoursArray.map(hour => <Text key={`hour-${hour}`} className='text-7xl py-4 text-dark-1 font-semibold text-center h-[80]'>{hour}</Text>)}
      </ScrollView>

      <Text className='text-7xl text-dark-1 font-semibold text-center'>:</Text>

      <ScrollView
        ref={minuteRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={80}
        decelerationRate='fast'
        onMomentumScrollEnd={(e) => handleMinuteScroll(e)}
      >
        {minutes.map(minute => <Text key={`hour-${minute}`} className='text-7xl py-4 text-dark-1 font-semibold text-center h-[80]'>{minute}</Text>)}
      </ScrollView>

      { !is24Hour &&
        <View className='flex-1 items-center justify-center pr-4'>
          <Pressable onPress={() => updatePartOfDay('AM')}>
            <Text className={`${partOfDay === 'AM' ? 'text-dark-1 font-bold' : 'text-dark-2 font-medium'} text-lg`}>AM</Text>
          </Pressable>
          <Pressable onPress={() => updatePartOfDay('PM')}>
            <Text className={`${partOfDay === 'PM' ? 'text-dark-1 font-bold' : 'text-dark-2'} text-lg`}>PM</Text>
          </Pressable>
        </View>
      }
    </View>
  )
}

export default Scroller