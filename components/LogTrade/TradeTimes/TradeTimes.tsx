import { View, Text } from 'react-native'
import SetTradeTimes from './SetTradeTimes'
import { useEffect, useState } from 'react'

const TradeTimes = () => {
  const [timeInTrade, setTimeInTrade] = useState('0h : 0m');
  // Round new dates down, so that decimals don't mess with calculations (like this: 17:00 - 15:00 = 1hr and 59min)
  const [entryTime, setEntryTime] = useState(Math.round(new Date().getTime() / 60000) * 60000);
  const [exitTime, setExitTime] = useState(Math.round(new Date().getTime() / 60000) * 60000);

  const updateEntryTime = (time: number) => {
    setEntryTime(time);
  }
  const updateExitTime = (time: number) => {
    setExitTime(time);
  }

  useEffect(() => calculateTimeInTrade(), [entryTime, exitTime]);

  const calculateTimeInTrade = () => {
    const newTimeInTrade = exitTime - entryTime;
    const hours = Math.floor((newTimeInTrade / 1000) / 3600);
    let minutes = Math.round(((newTimeInTrade / 1000) % 3600) / 60);

    if (newTimeInTrade < 0) {
      setTimeInTrade('0h : 0m');
    } else {
      setTimeInTrade(`${hours}h : ${minutes}m`);
    }
  }

  return (
    <View className='p-4 mb-4 rounded-2xl border border-dark-6 bg-dark-7'>
      <SetTradeTimes text='Entry Time' updateTime={updateEntryTime} time={entryTime}/>
      <SetTradeTimes text='Exit Time' updateTime={updateExitTime} time={exitTime}/>

      <View className='flex-row justify-between items-center'>
        <Text className='text-dark-2 font-semibold text-lg'>Time in Trade</Text>
        <Text className='text-dark-1 font-semibold text-lg'>{timeInTrade}</Text>
      </View>
    </View>
  )
}

export default TradeTimes