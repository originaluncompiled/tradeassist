import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useStats } from '@/hooks/useStats'
import { TradeData } from '@/constants/types'

const CurrentStreak = ({ tradeData }: TradeData) => {
  const { tradeDataByDay } = useStats();

  const [dayStreak, setDayStreaks] = useState({ current: NaN, currentStreakType: 'WIN', previous: NaN, previousStreakType: 'LOSS' });
  const getDayStreaks = useMemo(() => {
    let currentStreak = 0;
    let currentStreakType = tradeDataByDay[tradeDataByDay.findLastIndex((day) => day.outcome === 'WIN' || day.outcome === 'LOSS')]?.outcome;
    
    let currentStreakStart = tradeDataByDay.length - 1;
    // tradeDataByDay goes from oldest to latest trade, so we get the last trade that's a win/loss, which tells us the current streak
    currentStreakStart = tradeDataByDay.findLastIndex((day) => day.outcome === 'WIN' || day.outcome === 'LOSS');

    for (let i = currentStreakStart; i >= 0; i--) {
      if (tradeDataByDay[i].outcome === currentStreakType) {
        currentStreak++;
      } else {
        break;
      }
    }

    let previousStreak = 0;
    let previousStreakType = currentStreakType === 'LOSS' ? 'WIN' : 'LOSS';

    let previousStreakStart = currentStreakStart - currentStreak;
    for (let i = previousStreakStart; i >= 0; i--) {
      if (tradeDataByDay[i].outcome === previousStreakType) {
        previousStreak++;
      }else if (tradeDataByDay[i].outcome === 'BREAK EVEN') {
        continue;
      } else {
        break;
      }
    }

    return { current: currentStreak, currentStreakType: currentStreakType, previous: previousStreak, previousStreakType: previousStreakType };
  }, [tradeDataByDay]);

  const [tradeStreak, setTradeStreaks] = useState({ current: NaN, currentStreakType: 'WIN', previous: NaN, previousStreakType: 'LOSS' });
  const getTradeStreaks = useMemo(() => {
    let currentStreak = 0;
    let currentStreakType = tradeData[tradeData.findIndex((trade) => trade.tradeOutcome === 'WIN' || trade.tradeOutcome === 'LOSS')]?.tradeOutcome;
    
    if (currentStreakType === undefined) {
      return;
    }
    
    let currentStreakStart = tradeData.length - 1;
    // tradeData goes from latest to oldest trade, so we get the first trade that's a win/loss, which tells us the current streak
    currentStreakStart = tradeData.findIndex((trade) => trade.tradeOutcome === 'WIN' || trade.tradeOutcome === 'LOSS');

    for (let i = currentStreakStart; i < tradeData.length; i++) {
      if (tradeData[i].tradeOutcome === currentStreakType) {
        currentStreak++;
      } else {
        break;
      }
    }

    let previousStreak = 0;
    let previousStreakType = currentStreakType === 'LOSS' ? 'WIN' : 'LOSS';

    let previousStreakStart = currentStreakStart + currentStreak;
    for (let i = previousStreakStart; i < tradeData.length; i++) {
      if (tradeData[i].tradeOutcome === previousStreakType) {
        previousStreak++;
      } else if (tradeData[i].tradeOutcome === 'BREAK EVEN') {
        continue;
      } else {
        break;
      }
    }

    return { current: currentStreak, currentStreakType: currentStreakType, previous: previousStreak, previousStreakType: previousStreakType };
  }, [tradeData]);

  useEffect(() => {
    if (tradeDataByDay.length < 1 && tradeData.length < 1) return;
    
    setDayStreaks(getDayStreaks);

    if (getTradeStreaks === undefined) return;
    setTradeStreaks(getTradeStreaks);
  }, [getDayStreaks, getTradeStreaks]);

  return (
    <View className='flex-1 mx-[16px] my-2 rounded-2xl px-4 pt-3 pb-4 bg-dark-7 border border-dark-6'>
      <Text className='font-bold text-xl text-dark-2'>Current Streak</Text>

      <View className='flex-row flex-wrap justify-between'>
        <View>
          <Text className='font-medium text-lg text-dark-2'>Days</Text>
          <View className='flex-row items-center justify-center'>
            <View className='flex'>
              <Text className={`font-semibold text-3xl text-dark-1 px-4 py-2 border-4 rounded-full mt-2 text-center ${dayStreak.currentStreakType === 'WIN' ? 'border-accent-green' : 'border-accent-red'}`}>
                {dayStreak.current ? dayStreak.current : '-'}
              </Text>
            </View>

            <View className='ml-2'>
              <Text className={`font-medium text-dark-1 px-3 py-1 mb-2 min-w-16 border rounded-2xl text-center ${dayStreak.currentStreakType === 'WIN' ? 'border-accent-green bg-accent-green/60' : 'border-accent-red bg-accent-red/60'}`}>
                {dayStreak.current ? `${dayStreak.current} Days` : '-'}
              </Text>
              <Text className={`font-medium text-dark-1 px-3 py-1 min-w-16 border rounded-2xl text-center ${dayStreak.previousStreakType === 'WIN' ? 'border-accent-green bg-accent-green/60' : 'border-accent-red bg-accent-red/60'}`}>
                {dayStreak.previous ? `${dayStreak.previous} Days` : '-'}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text className='font-medium text-lg text-dark-2'>Trades</Text>
          <View className='flex-row items-center justify-center'>
            <View className='flex'>
              <Text className={`font-semibold text-3xl text-dark-1 px-4 py-2 border-4 rounded-full mt-2 text-center ${tradeStreak.currentStreakType === 'WIN' ? 'border-accent-green' : 'border-accent-red'}`}>
                {tradeStreak.current ? tradeStreak.current : '-'}
              </Text>
            </View>
            
            <View className='ml-2'>
              <Text className={`font-medium text-dark-1 px-3 py-1 mb-2 min-w-16 border rounded-2xl text-center ${tradeStreak.currentStreakType === 'WIN' ? 'border-accent-green bg-accent-green/60' : 'border-accent-red bg-accent-red/60'}`}>
                {tradeStreak.current ? `${tradeStreak.current} Trades` : '-'}
              </Text>
              <Text className={`font-medium text-dark-1 px-3 py-1 min-w-16 border rounded-2xl text-center ${tradeStreak.previousStreakType === 'WIN' ? 'border-accent-green bg-accent-green/60' : 'border-accent-red bg-accent-red/60'}`}>
                {tradeStreak.previous ? `${tradeStreak.previous} Trades` : '-'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CurrentStreak