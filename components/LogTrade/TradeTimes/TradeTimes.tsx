import { View, Text } from 'react-native'
import SetTradeTimes from './SetTradeTimes'
import { useEffect, useState } from 'react'
import { useTradeContext } from '@/hooks/useTradeContext';

const TradeTimes = () => {
  const { tradeState, dispatch } = useTradeContext();
  const { entryTime, exitTime } = tradeState;

  const [timeInTrade, setTimeInTrade] = useState('0h : 0m');

  const updateEntryTime = (time: number) => {
    dispatch({
      type: 'ENTRY_TIME',
      payload: time
    });
  }
  const updateExitTime = (time: number) => {
    dispatch({
      type: 'EXIT_TIME',
      payload: time
    })
  }

  useEffect(() => calculateTimeInTrade(), [entryTime, exitTime]);

  const calculateTimeInTrade = () => {
    if (!entryTime || !exitTime) return;

    const newTimeInTrade = exitTime - entryTime;
    const days = Math.floor((newTimeInTrade / 1000) / 86400);
    const hours = Math.floor(((newTimeInTrade / 1000) % 86400) / 3600);
    let minutes = Math.round((((newTimeInTrade / 1000) % 86400) % 3600) / 60);

    if (newTimeInTrade < 0) {
      setTimeInTrade('0d : 0h : 0m');
    } else {
      setTimeInTrade(`${days}d : ${hours}h : ${minutes}m`);
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