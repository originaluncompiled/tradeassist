import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TradeData } from '@/constants/types'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const TradeDuration = ({ tradeData }: TradeData) => {
  const [tradeDurationInfo, setTradeDurationInfo] = useState({ avgTradeDuration: 0, longestTradeDuration: 0, shortestTradeDuration: 0 });

  const getTradeDurations = useMemo(() => {
    // tradedurations get set to be in minutes, because that's the smallest time unit we want to display
    const totalTradeDuration = tradeData.reduce((total, trade) => total + (trade.exitTime - trade.entryTime), 0); // in milliseconds
    const avgTradeDuration = Math.round((totalTradeDuration / 1000 / 60) / tradeData.length);

    const tradeDurationArray = tradeData.map((trade) => Math.round((trade.exitTime - trade.entryTime) / 1000 / 60));
    
    const longestTradeDuration = Math.max(...tradeDurationArray);
    const shortestTradeDuration = Math.min(...tradeDurationArray);

    return { avgTradeDuration: avgTradeDuration, longestTradeDuration: longestTradeDuration, shortestTradeDuration: shortestTradeDuration };
  }, [tradeData]);

  useEffect(() => {
    if (tradeData.length < 1) return;

    setTradeDurationInfo(getTradeDurations)
  }, [getTradeDurations]);

  const formatDuration = (duration: number) => {
    let formattedDuration = '';
    let remainingDuration = duration;

    // '1440' is the amount of minutes in a day - not just the birth year of your mom
    if (remainingDuration >= 1440) {
      const days = Math.floor(remainingDuration / 60 / 24);
      formattedDuration = `${days}d `;
      remainingDuration = remainingDuration - (days * 60 * 24);
    }
    if (remainingDuration >= 60) {
      const hours = Math.floor(remainingDuration / 60);
      formattedDuration = formattedDuration + `${hours}h `;
      remainingDuration = remainingDuration - (hours * 60);
    }
    // even if the top 2 conditions aren't met, the remaining duration will always be the minutes at this point
    formattedDuration = formattedDuration + `${remainingDuration}m`;

    if (!formattedDuration) return '0m';

    return formattedDuration;
  }

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Trade Duration</Text>

      <View className='flex-1 flex-row justify-between'>
        <View className='flex-1 items-start'>
          <Text className='font-medium text-lg text-dark-2'>Average</Text>
          <Text className='font-medium text-xl text-dark-1 px-5 py-3 bg-dark-6 rounded-full mt-2'>
            {`${formatDuration(Math.round(tradeDurationInfo.avgTradeDuration))}`}
          </Text>
        </View>

        <View className='flex-1 flex-wrap justify-center pr-4'>
          <Text className='font-medium text-lg text-dark-2'>Shortest
            <Text className='text-dark-1'>
              {` ${formatDuration(Math.round(tradeDurationInfo.shortestTradeDuration))}`}
            </Text>
          </Text>
          <Text className='font-medium text-lg text-dark-2'>Longest
            <Text className='text-dark-1'>
              {` ${formatDuration(Math.round(tradeDurationInfo.longestTradeDuration))}`}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default TradeDuration