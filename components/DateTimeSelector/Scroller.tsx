import { View, Text, NativeSyntheticEvent, NativeScrollEvent, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { ScrollerProps } from '@/constants/types'
import { useUserSettings } from '@/hooks/useUserSettings'

const Scroller = ({ updateTime, initialTime }: ScrollerProps) => {
  const { is24Hour } = useUserSettings();
  // Only used when the user is using the 12 hour clock
  const [partOfDay, setPartOfDay] = useState('AM');

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
      setPartOfDay(new Date(initialTime).getHours() < 12 ? 'AM' : 'PM');
    }
  }, [initialTime])
  
  // Update the time right after the part of day gets switched, so that the time is correct, even without then updating the scroller
  useEffect(() => {
    if (is24Hour) return;
    // -1 means the time state hasn't been updated, which means the initialTime hasn't yet been saved/stored
    if (time.hours === -1 && time.minutes === -1) {
      createTime({
        hours: new Date(initialTime).getHours() % 12,
        minutes: new Date(initialTime).getMinutes()
      })
    } else {
      createTime(time);
    }
  }, [partOfDay])

  // an object so that I can keep track of the previous hours/minutes when one of them changes
  const [time, setTime] = useState({ hours: -1, minutes: -1 });
  const createTime = ({hours, minutes}: {hours?: number, minutes?: number}) => {
    const tempTime = {...time};

    // when switching between AM/PM, this ensures that the hours update accordingly
    if (!is24Hour && hours !== undefined && hours >= 12 && partOfDay === 'AM') {
      hours = hours - 12;
    }

    if (hours !== undefined) {
      if (is24Hour || partOfDay === 'AM') {
        tempTime.hours = hours;
      } else if (partOfDay === 'PM') {
        tempTime.hours = hours + 12;
      }
    }
    if (minutes !== undefined) tempTime.minutes = minutes;

    setTime(tempTime);

    // create the time value
    let d = new Date();
    d.setHours(tempTime.hours);
    d.setMinutes(tempTime.minutes);

    updateTime(new Date(d).getTime());
  }

  const handleHourScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    createTime({ hours: Math.round(e.nativeEvent.contentOffset.y / 80) })
  };
  const handleMinuteScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    createTime({ minutes: Math.round(e.nativeEvent.contentOffset.y / 80) })
  };

  return (
    <View className='flex-row justify-between items-center bg-green-2/75 border-2 border-green-2 rounded-lg h-24'>
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
          <Pressable onPress={() => setPartOfDay('AM')}>
            <Text className={`${partOfDay === 'AM' ? 'text-dark-1 font-bold' : 'text-dark-2 font-medium'} text-lg`}>AM</Text>
          </Pressable>
          <Pressable onPress={() => setPartOfDay('PM')}>
            <Text className={`${partOfDay === 'PM' ? 'text-dark-1 font-bold' : 'text-dark-2'} text-lg`}>PM</Text>
          </Pressable>
        </View>
      }
    </View>
  )
}

export default Scroller