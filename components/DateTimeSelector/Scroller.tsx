import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { ScrollerProps } from '@/constants/types'

const Scroller = ({ updateTime, initialTime }: ScrollerProps) => {
  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']

  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  // scroll to the initial time so that it's much more convenient to change the time slightly
  useEffect(() => {
    const hour = new Date(initialTime).getHours();
    const minute = new Date(initialTime).getMinutes();

    hourRef.current?.scrollTo({ x: 0, y: hour * 80, animated: true })
    minuteRef.current?.scrollTo({ x: 0, y: minute * 80, animated: true })
  }, [])

  // an object so that I can keep track of the previous hours/minutes when one of them changes
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const createTime = ({hours, minutes}: {hours?: number, minutes?: number}) => {
    const tempTime = {...time};

    if (hours) tempTime.hours = hours;
    else if (minutes) tempTime.minutes = minutes;

    setTime(tempTime);

    // create the time value
    let d = new Date();
    d.setHours(time.hours);
    d.setMinutes(time.minutes);

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
        onScroll={(e) => handleHourScroll(e)}
      >
        {hours.map(hour => <Text key={`hour-${hour}`} className='text-7xl py-4 text-dark-1 font-semibold text-center h-[80]'>{hour}</Text>)}
      </ScrollView>

      <Text className='text-7xl text-dark-1 font-semibold text-center'>:</Text>

      <ScrollView
        ref={minuteRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={80}
        decelerationRate='fast'
        onScroll={(e) => handleMinuteScroll(e)}
      >
        {minutes.map(minute => <Text key={`hour-${minute}`} className='text-7xl py-4 text-dark-1 font-semibold text-center h-[80]'>{minute}</Text>)}
      </ScrollView>
    </View>
  )
}

export default Scroller